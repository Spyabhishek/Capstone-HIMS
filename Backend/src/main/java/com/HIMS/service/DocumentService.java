


package com.HIMS.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.HIMS.model.Document;
import com.HIMS.repository.DocumentRepository;
import com.HIMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    public void uploadDocuments(String email, Long claimId, List<MultipartFile> files) {
        // Get user ID from email
        Long userId = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email))
            .getId();

        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");
            String fileUrl = uploadFileToS3(file, fileName);

            Document document = new Document(userId, claimId, fileName, fileUrl);
            documentRepository.save(document);
        }
    }

    private String uploadFileToS3(MultipartFile file, String fileName) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata));
                    
            return amazonS3.getUrl(bucketName, fileName).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }
    }

    public List<Document> getDocumentsByClaimId(Long claimId) {
        return documentRepository.findByClaimId(claimId);
    }

    public List<Document> getDocumentsByUserEmail(String email) {
        Long userId = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email))
            .getId();
        return documentRepository.findByUserId(userId);
    }
    
  public List<Document> getAllDocuments() {
  return documentRepository.findAll();
}
    public S3ObjectInputStream downloadDocument(String fileName) {
      S3Object s3Object = amazonS3.getObject(bucketName, fileName);
      return s3Object.getObjectContent();
  }
}
