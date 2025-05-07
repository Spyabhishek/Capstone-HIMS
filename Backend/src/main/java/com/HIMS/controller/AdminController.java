//package com.HIMS.controller;
//import com.HIMS.model.Document;
//import com.HIMS.service.DocumentService;
//
//import com.HIMS.dto.AuthRequest;
//import com.HIMS.dto.AuthResponse;
//import com.HIMS.dto.ClaimResponse;
//import com.HIMS.dto.PolicyResponse;
//import com.HIMS.service.ClaimService;
//import com.HIMS.service.PolicyService;
//import com.HIMS.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/admin")
//public class AdminController {
//
//    @Value("${admin.email}")
//    private String adminEmail;
//
//    @Value("${admin.password}")
//    private String adminPassword;
//    
//   private final ClaimService claimService;
//    private final JwtUtil jwtUtil;
//    private final PolicyService policyService;
//    private final DocumentService documentService;
//
//    @Autowired
//    public AdminController(JwtUtil jwtUtil, PolicyService policyService,ClaimService claimService,DocumentService documentService){
//        this.jwtUtil = jwtUtil;
//        this.policyService = policyService;
//        this.claimService = claimService;
//        this.documentService=documentService;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//        if (request.getEmail().equals(adminEmail) && request.getPassword().equals(adminPassword)) {
//            String token = jwtUtil.generateToken(adminEmail, List.of("ADMIN"));
//            return ResponseEntity.ok(new AuthResponse(token));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin credentials");
//        }
//    }
//
//    // 🔎 Admin gets all policies
//    @GetMapping("/policies/all")
//    @PreAuthorize("hasRole('ADMIN')")
//    public List<PolicyResponse> getAllPolicies() {
//        return policyService.getAllPolicies();
//    }
//
//    // ✅ Admin approves a policy
//    @PutMapping("/policies/{policyId}/approve")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<PolicyResponse> approvePolicy(@PathVariable Long policyId) {
//        PolicyResponse approvedPolicy = policyService.updatePolicyStatus(policyId, "APPROVED", null);
//        return ResponseEntity.ok(approvedPolicy);
//    }
//
//    // ❌ Admin rejects a policy with a reason
//    @PutMapping("/policies/{policyId}/reject")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<PolicyResponse> rejectPolicy(
//            @PathVariable Long policyId,
//            @RequestBody Map<String, String> requestBody
//    ) {
//        String reason = requestBody.get("reason");
//        PolicyResponse rejectedPolicy = policyService.updatePolicyStatus(policyId, "REJECTED", reason);
//        return ResponseEntity.ok(rejectedPolicy);
//    }
//    
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<?> deletePolicy(@PathVariable Long id) {
//        policyService.deletePolicy(id);
//        return ResponseEntity.ok("Policy deleted successfully");
//    }
//    
//    
//    // 🔎 Admin gets all claims
//    @GetMapping("/claims/all")
//    @PreAuthorize("hasRole('ADMIN')")
//    public List<ClaimResponse> getAllClaims() {
//        return claimService.getAllClaims();
//    }
//    
//    // ✅ Admin approves a claim
//    @PutMapping("/claims/{id}/approve")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ClaimResponse> approveClaim(@PathVariable Long id) {
//        ClaimResponse approved = claimService.updateClaimStatus(id, "APPROVED", "Claim approved by admin");
//        return ResponseEntity.ok(approved);
//    }
//
//    // ❌ Admin rejects a claim with reason
//    @PutMapping("/claims/{id}/reject")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ClaimResponse> rejectClaim(
//            @PathVariable Long id,
//            @RequestBody Map<String, String> request
//    ) {
//        String reason = request.get("reason");
//        if (reason == null || reason.trim().isEmpty()) {
//            reason = "No reason provided";
//        }
//
//        ClaimResponse rejected = claimService.updateClaimStatus(id, "REJECTED", reason);
//        return ResponseEntity.ok(rejected);
//    }
//
//    // 🗑️ Delete claim
//    @DeleteMapping("/claims/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<?> deleteClaim(@PathVariable Long id) {
//        claimService.deleteClaim(id);
//        return ResponseEntity.ok("Claim deleted successfully");
//    }
//    
//
//
//    
//    @GetMapping("/documents/all")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<List<Document>> getAllDocuments() {
//        List<Document> documents = documentService.getAllDocuments();
//        return ResponseEntity.ok(documents);
//    }
//    
//    
//}


package com.HIMS.controller;

import com.HIMS.model.Document;
import com.HIMS.service.ClaimService;
import com.HIMS.service.DocumentService;
import com.HIMS.service.PolicyService;
import com.HIMS.util.JwtUtil;
import com.HIMS.dto.AuthRequest;
import com.HIMS.dto.AuthResponse;
import com.HIMS.dto.ClaimResponse;
import com.HIMS.dto.PolicyResponse;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    private final ClaimService claimService;
    private final JwtUtil jwtUtil;
    private final PolicyService policyService;
    private final DocumentService documentService;

    @Autowired
    public AdminController(JwtUtil jwtUtil, PolicyService policyService, ClaimService claimService, DocumentService documentService) {
        this.jwtUtil = jwtUtil;
        this.policyService = policyService;
        this.claimService = claimService;
        this.documentService = documentService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        if (request.getEmail().equals(adminEmail) && request.getPassword().equals(adminPassword)) {
            String token = jwtUtil.generateToken(adminEmail, List.of("ADMIN"));
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin credentials");
        }
    }

    @GetMapping("/policies/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<PolicyResponse> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @PutMapping("/policies/{policyId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> approvePolicy(@PathVariable Long policyId) {
        PolicyResponse approvedPolicy = policyService.updatePolicyStatus(policyId, "APPROVED", null);
        return ResponseEntity.ok(approvedPolicy);
    }

    @PutMapping("/policies/{policyId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> rejectPolicy(@PathVariable Long policyId, @RequestBody Map<String, String> requestBody) {
        String reason = requestBody.get("reason");
        PolicyResponse rejectedPolicy = policyService.updatePolicyStatus(policyId, "REJECTED", reason);
        return ResponseEntity.ok(rejectedPolicy);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
        return ResponseEntity.ok("Policy deleted successfully");
    }

    @GetMapping("/claims/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClaimResponse> getAllClaims() {
        return claimService.getAllClaims();
    }

    @PutMapping("/claims/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClaimResponse> approveClaim(@PathVariable Long id) {
        ClaimResponse approved = claimService.updateClaimStatus(id, "APPROVED", "Claim approved by admin");
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/claims/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClaimResponse> rejectClaim(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String reason = request.getOrDefault("reason", "No reason provided");
        ClaimResponse rejected = claimService.updateClaimStatus(id, "REJECTED", reason);
        return ResponseEntity.ok(rejected);
    }

    @DeleteMapping("/claims/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteClaim(@PathVariable Long id) {
        claimService.deleteClaim(id);
        return ResponseEntity.ok("Claim deleted successfully");
    }

    @GetMapping("/documents/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // ✅ Download document by file name
    @GetMapping("/documents/download/{fileName}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable String fileName) {
        try (S3ObjectInputStream inputStream = documentService.downloadDocument(fileName)) {
            byte[] content = inputStream.readAllBytes();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());

            return new ResponseEntity<>(content, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error downloading file: " + e.getMessage()).getBytes());
        }
    }
}

