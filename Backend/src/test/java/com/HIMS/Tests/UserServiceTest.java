package com.HIMS.Tests;
import com.HIMS.dto.*;
import com.HIMS.exception.InvalidCredentialsException;
import com.HIMS.model.User;
import com.HIMS.repository.UserRepository;
import com.HIMS.service.EmailService;
import com.HIMS.service.UserService;
import com.HIMS.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtUtil jwtUtil;
    @Mock private EmailService emailService;

    @InjectMocks private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Registration - success
    @Test
    void testRegisterUser_Success() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john@example.com", "Password123", "user");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(passwordEncoder.encode("Password123")).thenReturn("hashedPassword");

        String result = userService.registerUser(request);

        assertEquals("Registration successful with role: USER", result);
        verify(userRepository).save(any(User.class));
    }

    // Registration - password too short
    @Test
    void testRegisterUser_PasswordTooShort() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john@example.com", "short", "user");

        String result = userService.registerUser(request);

        assertEquals("Password must be at least 8 characters long!", result);
        verify(userRepository, never()).save(any());
    }

    // Registration - email exists
    @Test
    void testRegisterUser_EmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john@example.com", "Password123", "user");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(true);

        String result = userService.registerUser(request);

        assertEquals("Email is already in use!", result);
        verify(userRepository, never()).save(any());
    }

    // Login - success
    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest("john@example.com", "Password123");
        User user = new User();
        user.setEmail("john@example.com");
        user.setPassword("hashedPassword");
        user.setRole("USER");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Password123", "hashedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("john@example.com", List.of("USER"))).thenReturn("mockToken");

        LoginResponse response = userService.login(request);

        assertEquals("Login successful", response.getMessage());
        assertEquals("mockToken", response.getToken());
        assertEquals("USER", response.getRole());
    }

    // Login - wrong password
    @Test
    void testLogin_WrongPassword() {
        LoginRequest request = new LoginRequest("john@example.com", "wrongPassword");
        User user = new User();
        user.setEmail("john@example.com");
        user.setPassword("correctHash");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", "correctHash")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> userService.login(request));
    }

    // Login - user not found
    @Test
    void testLogin_UserNotFound() {
        LoginRequest request = new LoginRequest("notfound@example.com", "password");

        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> userService.login(request));
    }

    // Send password reset link - user exists
    @Test
    void testSendPasswordResetLink_UserExists() {
        String email = "john@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        userService.sendPasswordResetLink(email);

        verify(userRepository).save(any());
        verify(emailService).sendResetLink(eq(email), any(String.class));
    }

    // Send password reset link - user not found
    @Test
    void testSendPasswordResetLink_UserNotFound() {
        when(userRepository.findByEmail("noone@example.com")).thenReturn(Optional.empty());

        // Should not throw exception
        userService.sendPasswordResetLink("noone@example.com");

        verify(userRepository, never()).save(any());
        verify(emailService, never()).sendResetLink(any(), any());
    }

    // Reset password - success
    @Test
    void testResetPassword_Success() {
        String token = UUID.randomUUID().toString();
        String newPassword = "NewPassword123";
        User user = new User();
        user.setResetToken(token);

        when(userRepository.findByResetToken(token)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(newPassword)).thenReturn("hashed");

        String result = userService.resetPassword(token, newPassword);

        assertEquals("Password reset successful", result);
        verify(userRepository).save(user);
        assertNull(user.getResetToken());
    }

    // Reset password - invalid token
    @Test
    void testResetPassword_InvalidToken() {
        when(userRepository.findByResetToken("bad-token")).thenReturn(Optional.empty());

        String result = userService.resetPassword("bad-token", "pass");

        assertEquals("Invalid or expired token", result);
    }

    // Get profile - user found
    @Test
    void testGetUserProfile_Success() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setRole("USER");
        user.setAddress("123 Main St");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        UserProfileDto profile = userService.getUserProfile("john@example.com");

        assertNotNull(profile);
        assertEquals("John", profile.getFirstName());
        assertEquals("Doe", profile.getLastName());
        assertEquals("john@example.com", profile.getEmail());
        assertEquals("USER", profile.getRole());
        assertEquals("123 Main St", profile.getAddress());
    }

    // Get profile - user not found
    @Test
    void testGetUserProfile_UserNotFound() {
        when(userRepository.findByEmail("none@example.com")).thenReturn(Optional.empty());

        UserProfileDto result = userService.getUserProfile("none@example.com");

        assertNull(result);
    }
   
    // Update user details - not found
    @Test
    void testUpdateUserDetails_UserNotFound() {
        when(userRepository.findByEmail("none@example.com")).thenReturn(Optional.empty());

        String result = userService.updateUserDetails("none@example.com", new UpdateUserRequest());

        assertEquals("User not found", result);
    }
}
