//package com.HIMS.controller;
//
//import com.HIMS.dto.ClaimRequest;
//import com.HIMS.dto.ClaimTrackingResponse;
//import com.HIMS.model.ClaimStatusHistory;
//import com.HIMS.dto.ClaimResponse;
//import com.HIMS.service.ClaimService;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/claims")
//public class ClaimController {
//
//    private final ClaimService claimService;
//
//    public ClaimController(ClaimService claimService) {
//        this.claimService = claimService;
//    }
//
//    @PostMapping("/create")
//    public ClaimResponse submitClaim(@RequestBody ClaimRequest request) {
//        return claimService.submitClaim(request);
//    }
//
//    @GetMapping("/user")
//    public List<ClaimResponse> getClaimsByUser() {
//        return claimService.getClaimsByUser();
//    }
//
//    @GetMapping("/{claimId}")
//    public ClaimResponse getClaimById(@PathVariable Long claimId) {
//        return claimService.getClaimById(claimId);
//    }
//    
//    @GetMapping("/tracking")
//    public List<ClaimTrackingResponse> trackUserClaims() {
//        return claimService.trackUserClaims();
//    }
//    
//    @GetMapping("/{claimId}/status-history")
//    public ResponseEntity<List<Map<String, Object>>> getClaimStatusHistory(@PathVariable Long claimId) {
//        List<ClaimStatusHistory> histories = claimService.getClaimStatusHistory(claimId);
//
//        List<Map<String, Object>> response = histories.stream().map(history -> {
//            Map<String, Object> map = new HashMap<>();
//            map.put("status", history.getStatus().toString());
//            map.put("timestamp", history.getTimestamp());
//            map.put("notes", history.getNotes());
//            return map;
//        }).collect(Collectors.toList());
//
//        return ResponseEntity.ok(response);
//    }
//
//
//
//   
//}

package com.HIMS.controller;

import com.HIMS.dto.ClaimRequest;
import com.HIMS.dto.ClaimTrackingResponse;
import com.HIMS.dto.ClaimResponse;
import com.HIMS.model.ClaimStatusHistory;
import com.HIMS.service.ClaimService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping("/create")
    public ClaimResponse submitClaim(@RequestBody ClaimRequest request) {
        return claimService.submitClaim(request);
    }

    @GetMapping("/user")
    public List<ClaimResponse> getClaimsByUser() {
        return claimService.getClaimsByUser();
    }

    @GetMapping("/{claimId}")
    public ClaimResponse getClaimById(@PathVariable Long claimId) {
        return claimService.getClaimById(claimId);
    }

    @GetMapping("/tracking")
    public List<ClaimTrackingResponse> trackUserClaims() {
        return claimService.trackUserClaims();
    }

    // New Endpoint for Claim Status History
    @GetMapping("/{claimId}/status-history")
    public ResponseEntity<List<Map<String, Object>>> getClaimStatusHistory(@PathVariable Long claimId) {
        // Fetch Claim Status History for the given claimId
        List<ClaimStatusHistory> histories = claimService.getClaimStatusHistory(claimId);

        // Mapping the ClaimStatusHistory to a simplified response format
        List<Map<String, Object>> response = histories.stream().map(history -> {
            Map<String, Object> map = new HashMap<>();
            map.put("status", history.getStatus().toString());
            map.put("timestamp", history.getTimestamp());
            map.put("notes", history.getNotes());
            return map;
        }).collect(Collectors.toList());

        // Return the list of history as a response
        return ResponseEntity.ok(response);
    }
    
  
}

