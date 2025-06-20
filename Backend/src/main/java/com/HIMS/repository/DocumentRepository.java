package com.HIMS.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HIMS.model.Document;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByClaimId(Long claimId);
    List<Document> findByUserId(Long userId);
}
