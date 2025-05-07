package com.HIMS.Tests;
import com.HIMS.dto.PropertyRequest;
import com.HIMS.dto.PropertyResponse;
import com.HIMS.model.Property;
import com.HIMS.model.User;
import com.HIMS.repository.PropertyRepository;
import com.HIMS.repository.UserRepository;
import com.HIMS.service.PropertyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;  
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class PropertyServiceTest {

    @InjectMocks
    private PropertyService propertyService;

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private UserRepository userRepository;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }
   
    	
    
    @Test
    void testGetAllProperties_success() {
        Property property = new Property();
        property.setPropertyId(1L);
        property.setAddress("123 Street");
        User user = new User();
        user.setEmail("john@example.com");
        property.setUser(user);

        when(propertyRepository.findAll()).thenReturn(List.of(property));

        List<PropertyResponse> result = propertyService.getAllProperties();

        assertEquals(1, result.size());
        assertEquals("123 Street", result.get(0).getAddress());
    }

    @Test
    void testGetPropertiesByUserEmail_success() {
        String email = "john@example.com";
        User user = new User();
        user.setEmail(email);

        Property property = new Property();
        property.setAddress("456 Avenue");
        property.setUser(user);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(propertyRepository.findByUser(user)).thenReturn(List.of(property));

        List<PropertyResponse> result = propertyService.getPropertiesByUserEmail(email);

        assertEquals(1, result.size());
        assertEquals("456 Avenue", result.get(0).getAddress());
    }

    @Test
    void testGetPropertyById_success() {
        Property property = new Property();
        property.setPropertyId(1L);
        property.setAddress("789 Blvd");
        User user = new User();
        user.setEmail("john@example.com");
        property.setUser(user);

        when(propertyRepository.findById(1L)).thenReturn(Optional.of(property));

        PropertyResponse response = propertyService.getPropertyById(1L);

        assertEquals("789 Blvd", response.getAddress());
    }

    @Test
    void testGetPropertyById_notFound() {
        when(propertyRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                propertyService.getPropertyById(99L));
        assertEquals("Property not found", exception.getMessage());
    }

    @Test
    void testDeleteProperty_success() {
        Property property = new Property();
        property.setPropertyId(1L);

        when(propertyRepository.findById(1L)).thenReturn(Optional.of(property));

        propertyService.deleteProperty(1L);

        verify(propertyRepository, times(1)).delete(property);
    }

    @Test
    void testDeleteProperty_notFound() {
        when(propertyRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                propertyService.deleteProperty(99L));
        assertEquals("Property not found", exception.getMessage());
    }
}
