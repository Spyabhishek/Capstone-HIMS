package com.HIMS.controller;

import com.HIMS.dto.PolicyRequest;
import com.HIMS.dto.PolicyResponse;
import com.HIMS.repository.PolicyRepository;
import com.HIMS.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {
	
	@Autowired
    private final PolicyRepository policyRepository;

    @Autowired
    private PolicyService policyService;

    PolicyController(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @PostMapping("/submit")
    public PolicyResponse savePolicy(@RequestBody PolicyRequest request) {
        return policyService.savePolicy(request);
    }

    @GetMapping("/property/{propertyId}")
    public List<PolicyResponse> getPoliciesByProperty(@PathVariable Long propertyId) {
        return policyService.getPoliciesByProperty(propertyId);
    }

    @GetMapping("/user")
    public List<PolicyResponse> getUserPolicies() {
        return policyService.getPoliciesForCurrentUser();
    }

//    @GetMapping("/all")
//    public List<PolicyResponse> getAllPolicies() {
//        return policyService.getAllPolicies();
//    }
//    
   
}
