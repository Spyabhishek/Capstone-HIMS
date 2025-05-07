package com.HIMS.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HIMS.dto.ClaimTrackingResponse;
import com.HIMS.dto.ClaimRequest;
import com.HIMS.dto.ClaimResponse;
import com.HIMS.exception.ResourceNotFoundException;
import com.HIMS.model.Claim;
import com.HIMS.model.ClaimStatus;
import com.HIMS.model.ClaimStatusHistory;
import com.HIMS.model.Policy;
import com.HIMS.model.User;
import com.HIMS.repository.ClaimRepository;
import com.HIMS.repository.ClaimStatusHistoryRepository;
import com.HIMS.repository.PolicyRepository;
import com.HIMS.repository.UserRepository;

@Service
@Transactional
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;
    private final UserRepository userRepository;
    private final ClaimStatusHistoryRepository claimStatusHistoryRepository;
    private final EmailService emailService;

    public ClaimService(ClaimRepository claimRepository, 
                        PolicyRepository policyRepository,
                        UserRepository userRepository, 
                        ClaimStatusHistoryRepository claimStatusHistoryRepository,
                        EmailService emailService) {
        this.claimRepository = claimRepository;
        this.policyRepository = policyRepository;
        this.userRepository = userRepository;
        this.claimStatusHistoryRepository = claimStatusHistoryRepository;
        this.emailService = emailService;
    }

    public ClaimResponse submitClaim(ClaimRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Policy policy = policyRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found"));

        Claim claim = new Claim();
        claim.setIncidentDate(request.getIncidentDate());
        claim.setEstimatedCost(request.getEstimatedCost());
        claim.setDamageLocation(request.getDamageLocation());
        claim.setStatus(request.getStatus());
        claim.setDescription(request.getDescription());
        claim.setPolicy(policy);
        claim.setUser(user);
        claim.setSubmittedAt(LocalDate.now());
        claim.setLastUpdated(LocalDate.now());
        claim.setEstimatedResolutionDate(LocalDate.now().plusDays(7));
        claim.setImageUrl(request.getImageUrl());

        Claim saved = claimRepository.save(claim);

        saveStatusHistory(saved, request.getStatus(), "Initial submission");

        return mapToResponse(saved);
    }

    public List<ClaimResponse> getClaimsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return claimRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ClaimResponse> getAllClaims() {
        return claimRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ClaimResponse getClaimById(Long claimId) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found"));
        return mapToResponse(claim);
    }

    public void deleteClaim(Long claimId) {
        if (!claimRepository.existsById(claimId)) {
            throw new ResourceNotFoundException("Claim not found");
        }
        claimRepository.deleteById(claimId);
    }

    public ClaimResponse updateClaimStatus(Long claimId, String newStatus, String notes) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found"));

        ClaimStatus statusEnum;
        try {
            statusEnum = ClaimStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status. Allowed: APPROVED, REJECTED, etc.");
        }

        claim.setStatus(statusEnum);
        claim.setLastUpdated(LocalDate.now());

        Claim updated = claimRepository.save(claim);

        String finalNotes = (notes == null || notes.trim().isEmpty())
                ? "Status updated by Admin to " + newStatus
                : notes;

        saveStatusHistory(updated, statusEnum, finalNotes);

        // ✅ Email notification logic
        User user = claim.getUser();
        String email = user.getEmail();
        String name = user.getFirstName();

        if (statusEnum == ClaimStatus.APPROVED) {
            emailService.sendClaimApprovalEmail(email, name, claim.getClaimId());
        } else if (statusEnum == ClaimStatus.REJECTED) {
            emailService.sendClaimRejectionEmail(email, name, claim.getClaimId(), finalNotes);
        }

        return mapToResponse(updated);
    }

    private void saveStatusHistory(Claim claim, ClaimStatus status, String notes) {
        ClaimStatusHistory history = new ClaimStatusHistory();
        history.setClaim(claim);
        history.setStatus(status);
        history.setTimestamp(LocalDate.now());
        history.setNotes(notes);
        claimStatusHistoryRepository.save(history);
    }

    public List<ClaimTrackingResponse> trackUserClaims() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return claimRepository.findByUserId(user.getId())
                .stream()
                .map(claim -> {
                    ClaimTrackingResponse response = new ClaimTrackingResponse();
                    response.setClaimId(claim.getClaimId());
                    response.setStatus(claim.getStatus());
                    response.setEstimatedResolutionDate(claim.getEstimatedResolutionDate());
                    return response;
                })
                .collect(Collectors.toList());
    }

    public List<ClaimStatusHistory> getClaimStatusHistory(Long claimId) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found with ID: " + claimId));
        return claimStatusHistoryRepository.findByClaimOrderByTimestampAsc(claim);
    }

    private ClaimResponse mapToResponse(Claim claim) {
        ClaimResponse response = new ClaimResponse();
        response.setClaimId(claim.getClaimId());
        response.setIncidentDate(claim.getIncidentDate());
        response.setEstimatedCost(claim.getEstimatedCost());
        response.setDamageLocation(claim.getDamageLocation());
        response.setStatus(claim.getStatus());
        response.setDescription(claim.getDescription());
        response.setSubmittedAt(claim.getSubmittedAt());
        response.setLastUpdated(claim.getLastUpdated());
        response.setEstimatedResolutionDate(claim.getEstimatedResolutionDate());
        response.setPolicyId(claim.getPolicy().getPolicyId());
        response.setUserId(claim.getUser().getId());
        response.setImageUrl(claim.getImageUrl());
        return response;
    }
 

}
