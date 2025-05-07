package com.HIMS.Tests;
import com.HIMS.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import static org.mockito.Mockito.*;
class EmailServiceTest {
    @Mock
    private JavaMailSender mailSender;
    @InjectMocks
    private EmailService emailService;
    @Captor
    private ArgumentCaptor<SimpleMailMessage> messageCaptor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testSendResetLink() {
        String email = "sevensparks@example.com";
        String token = "123456789-token";
        emailService.sendResetLink(email, token);
        verify(mailSender, times(1)).send(messageCaptor.capture());
        SimpleMailMessage capturedMessage = messageCaptor.getValue();
        String expectedLink = "http://localhost:5173/reset-password?token=" + token;
        // Assertions
        assert capturedMessage.getTo()[0].equals(email);
        assert capturedMessage.getSubject().equals("Reset Your Password Securely");
        assert capturedMessage.getText().contains(expectedLink);
        assert capturedMessage.getText().contains("This is an automated message, please do not reply.");
    }
}

