//
//package com.HIMS.service;
//
//import com.HIMS.dto.PolicyRequest;
//import com.HIMS.dto.PolicyResponse;
//import com.HIMS.exception.ResourceNotFoundException;
//import com.HIMS.exception.UserNotFoundException;
//import com.HIMS.model.Policy;
//import com.HIMS.model.Property;
//import com.HIMS.model.User;
//import com.HIMS.repository.PolicyRepository;
//import com.HIMS.repository.PropertyRepository;
//import com.HIMS.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//public class PolicyService {
//
//    private static final Logger logger = LoggerFactory.getLogger(PolicyService.class);
//    
//    @Autowired
//    private EmailService emailService;
//    
//    @Autowired
//    private PolicyRepository policyRepository;
//
//    @Autowired
//    private PropertyRepository propertyRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Transactional
//    public PolicyResponse savePolicy(PolicyRequest request) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        User user = userRepository.findByEmail(username)
//                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
//        Long userId = user.getId();
//
//        if (userId == null) {
//            throw new IllegalArgumentException("User ID cannot be null");
//        }
//        if (request.getType() == null || request.getType().isEmpty()) {
//            throw new IllegalArgumentException("Policy type cannot be empty");
//        }
//
//        Policy policy = new Policy();
//        policy.setUser(user);
//        policy.setType(request.getType());
//        policy.setPremium(request.getPremium() != null ? request.getPremium() : 0.0);
//        policy.setCoverageDetails(request.getCoverageDetails());
//        policy.setExclusions(request.getExclusions());
//        policy.setStatus("PENDING");
//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        if (request.getStartDate() != null) {
//            policy.setStartDate(LocalDate.parse(request.getStartDate(), formatter));
//        }
//        if (request.getEndDate() != null) {
//            policy.setEndDate(LocalDate.parse(request.getEndDate(), formatter));
//        }
//
//        if (request.getPropertyId() != null) {
//            Property property = propertyRepository.findById(request.getPropertyId())
//                    .orElseThrow(() -> new RuntimeException("Property not found with ID: " + request.getPropertyId()));
//            policy.setProperty(property);
//        }
//
//        policy.setPolicyNumber("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
//
//        Policy savedPolicy = policyRepository.save(policy);
//        return mapToResponse(savedPolicy);
//    }
//
//    public List<PolicyResponse> getPoliciesByProperty(Long propertyId) {
//        return policyRepository.findByPropertyPropertyId(propertyId)
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//
//    public List<PolicyResponse> getAllPolicies() {
//        return policyRepository.findAll()
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//
//    public List<PolicyResponse> getPoliciesForCurrentUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        logger.info("Fetching policies for user: {}", username);
//
//        User user = userRepository.findByEmail(username)
//                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
//
//        return policyRepository.findByUserId(user.getId())
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//    
//    public void deletePolicy(Long id) {
//        if (!policyRepository.existsById(id)) {
//            throw new ResourceNotFoundException("Policy not found");
//        }
//        policyRepository.deleteById(id);
//    }
//
//     
//    @Transactional
//    public PolicyResponse updatePolicyStatus(Long policyId, String status, String reason) {
//        Policy policy = policyRepository.findById(policyId)
//                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + policyId));
//
//        policy.setStatus(status);
//
//        if ("REJECTED".equalsIgnoreCase(status)) {
//            policy.setRejectionReason(reason != null ? reason : "No reason provided");
//        } else {
//            policy.setRejectionReason(null); // clear reason if approved
//        }
//
//        return mapToResponse(policyRepository.save(policy));
//    }
//
//
//    private PolicyResponse mapToResponse(Policy policy) {
//        PolicyResponse response = new PolicyResponse();
//        response.setPolicyId(policy.getPolicyId());
//        response.setPolicyNumber(policy.getPolicyNumber());
//        response.setType(policy.getType());
//        response.setPremium(policy.getPremium());
//        response.setCoverageDetails(policy.getCoverageDetails());
//        response.setExclusions(policy.getExclusions());
//        response.setStatus(policy.getStatus());
//        response.setStartDate(policy.getStartDate());
//        response.setEndDate(policy.getEndDate());
//        response.setRejectionReason(policy.getRejectionReason());
//
//
//        if (policy.getProperty() != null) {
//            response.setPropertyId(policy.getProperty().getPropertyId());
//            response.setPropertyAddress(policy.getProperty().getAddress());
//        }
//
//        if (policy.getUser() != null) {
//            response.setUserId(policy.getUser().getId());
//            response.setUserName(policy.getUser().getFirstName() + " " + policy.getUser().getLastName());
//        }
//
//        return response;
//    }
//}
//

package com.HIMS.service;

import com.HIMS.dto.PolicyRequest;
import com.HIMS.dto.PolicyResponse;
import com.HIMS.exception.ResourceNotFoundException;
import com.HIMS.exception.UserNotFoundException;
import com.HIMS.model.Policy;
import com.HIMS.model.Property;
import com.HIMS.model.User;
import com.HIMS.repository.PolicyRepository;
import com.HIMS.repository.PropertyRepository;
import com.HIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    private static final Logger logger = LoggerFactory.getLogger(PolicyService.class);

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public PolicyResponse savePolicy(PolicyRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
        Long userId = user.getId();

        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (request.getType() == null || request.getType().isEmpty()) {
            throw new IllegalArgumentException("Policy type cannot be empty");
        }

        Policy policy = new Policy();
        policy.setUser(user);
        policy.setType(request.getType());
        policy.setPremium(request.getPremium() != null ? request.getPremium() : 0.0);
        policy.setCoverageDetails(request.getCoverageDetails());
        policy.setExclusions(request.getExclusions());
        policy.setStatus("PENDING");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (request.getStartDate() != null) {
            policy.setStartDate(LocalDate.parse(request.getStartDate(), formatter));
        }
        if (request.getEndDate() != null) {
            policy.setEndDate(LocalDate.parse(request.getEndDate(), formatter));
        }

        if (request.getPropertyId() != null) {
            Property property = propertyRepository.findById(request.getPropertyId())
                    .orElseThrow(() -> new RuntimeException("Property not found with ID: " + request.getPropertyId()));
            policy.setProperty(property);
        }

        policy.setPolicyNumber("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Policy savedPolicy = policyRepository.save(policy);
        return mapToResponse(savedPolicy);
    }

    public List<PolicyResponse> getPoliciesByProperty(Long propertyId) {
        return policyRepository.findByPropertyPropertyId(propertyId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PolicyResponse> getAllPolicies() {
        return policyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PolicyResponse> getPoliciesForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        logger.info("Fetching policies for user: {}", username);

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));

        return policyRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deletePolicy(Long id) {
        if (!policyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Policy not found");
        }
        policyRepository.deleteById(id);
    }

    @Transactional
    public PolicyResponse updatePolicyStatus(Long policyId, String status, String reason) {
        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + policyId));

        policy.setStatus(status);

        User user = policy.getUser();
        String userEmail = user.getEmail();
        String userName = user.getFirstName() + " " + user.getLastName();
        String policyNumber = policy.getPolicyNumber();

        if ("REJECTED".equalsIgnoreCase(status)) {
            policy.setRejectionReason(reason != null ? reason : "No reason provided");
            emailService.sendPolicyRejectionEmail(userEmail, userName, policyNumber, policy.getRejectionReason());
        } else if ("APPROVED".equalsIgnoreCase(status)) {
            policy.setRejectionReason(null); // clear reason
            emailService.sendPolicyApprovalEmail(userEmail, userName, policyNumber);
        }

        return mapToResponse(policyRepository.save(policy));
    }

    private PolicyResponse mapToResponse(Policy policy) {
        PolicyResponse response = new PolicyResponse();
        response.setPolicyId(policy.getPolicyId());
        response.setPolicyNumber(policy.getPolicyNumber());
        response.setType(policy.getType());
        response.setPremium(policy.getPremium());
        response.setCoverageDetails(policy.getCoverageDetails());
        response.setExclusions(policy.getExclusions());
        response.setStatus(policy.getStatus());
        response.setStartDate(policy.getStartDate());
        response.setEndDate(policy.getEndDate());
        response.setRejectionReason(policy.getRejectionReason());

        if (policy.getProperty() != null) {
            response.setPropertyId(policy.getProperty().getPropertyId());
            response.setPropertyAddress(policy.getProperty().getAddress());
        }

        if (policy.getUser() != null) {
            response.setUserId(policy.getUser().getId());
            response.setUserName(policy.getUser().getFirstName() + " " + policy.getUser().getLastName());
        }

        return response;
    }
}

