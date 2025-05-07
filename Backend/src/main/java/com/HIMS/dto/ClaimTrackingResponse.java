package com.HIMS.dto;

import com.HIMS.model.ClaimStatus;
import java.time.LocalDate;

public class ClaimTrackingResponse {
    private Long claimId;
    private ClaimStatus status;
    private LocalDate estimatedResolutionDate;

    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }

    public ClaimStatus getStatus() {
        return status;
    }

    public void setStatus(ClaimStatus status) {
        this.status = status;
    }

    public LocalDate getEstimatedResolutionDate() {
        return estimatedResolutionDate;
    }

    public void setEstimatedResolutionDate(LocalDate estimatedResolutionDate) {
        this.estimatedResolutionDate = estimatedResolutionDate;
    }
}
