package com.HIMS.Tests;
import com.HIMS.dto.PolicyRequest;
import com.HIMS.dto.PolicyResponse;
import com.HIMS.model.Policy;
import com.HIMS.model.Property;
import com.HIMS.model.User;
import com.HIMS.repository.PolicyRepository;
import com.HIMS.repository.PropertyRepository;
import com.HIMS.repository.UserRepository;
import com.HIMS.service.PolicyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDate;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class PolicyServiceTest {
    @InjectMocks
    private PolicyService policyService;
    @Mock
    private PolicyRepository policyRepository;
    @Mock
    private PropertyRepository propertyRepository;
    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

   
    @Test
    void getPoliciesByProperty_success() {
        Property property = new Property();
        property.setPropertyId(1L);
        property.setAddress("456 Elm St");

        Policy policy = new Policy();
        policy.setPolicyId(200L);
        policy.setType("Home");
        policy.setPremium(4500.0);
        policy.setCoverageDetails("Covers fire only");
        policy.setExclusions("Earthquakes");
        policy.setStatus("ACTIVE");
        policy.setProperty(property);

        when(policyRepository.findByPropertyPropertyId(1L)).thenReturn(List.of(policy));

        List<PolicyResponse> responses = policyService.getPoliciesByProperty(1L);

        assertEquals(1, responses.size());
        assertEquals("Home", responses.get(0).getType());
        assertEquals("456 Elm St", responses.get(0).getPropertyAddress());
    }

    @Test
    void getAllPolicies_success() {
        Policy policy1 = new Policy();
        policy1.setPolicyId(101L);
        policy1.setType("Auto");
        Policy policy2 = new Policy();
        policy2.setPolicyId(102L);
        policy2.setType("Health");
        when(policyRepository.findAll()).thenReturn(List.of(policy1, policy2));
        List<PolicyResponse> responses = policyService.getAllPolicies();
        assertEquals(2, responses.size());
        assertEquals("Auto", responses.get(0).getType());
        assertEquals("Health", responses.get(1).getType());
    }

   

    
}
