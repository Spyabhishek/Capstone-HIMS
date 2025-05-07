package com.HIMS.repository;

import com.HIMS.model.ClaimStatusHistory;
import com.HIMS.model.Claim;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimStatusHistoryRepository extends JpaRepository<ClaimStatusHistory, Long> {
    List<ClaimStatusHistory> findByClaim_ClaimId(Long claimId);
    List<ClaimStatusHistory> findByClaimOrderByTimestampAsc(Claim claim);

}
