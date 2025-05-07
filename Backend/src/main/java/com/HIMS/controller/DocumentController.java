package com.HIMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.HIMS.model.Document;
import com.HIMS.service.DocumentService;
import com.HIMS.model.Claim;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public String uploadDocuments(
            @RequestParam String email,
            @RequestParam Long claimId,
            @RequestParam("files") List<MultipartFile> files) {
        try {
            documentService.uploadDocuments(email, claimId, files);
            return "Documents uploaded successfully!";
        } catch (Exception e) {
            return "Error uploading documents: " + e.getMessage();
        }
    }

    @GetMapping("/claim/{claimId}")
    public List<Document> getDocumentsByClaimId(@PathVariable Long claimId) {
        return documentService.getDocumentsByClaimId(claimId);
    }

    @GetMapping("/user/{email}")
    public List<Document> getDocumentsByUserEmail(@PathVariable String email) {
        return documentService.getDocumentsByUserEmail(email);
    }
}
