package com.HIMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetLink(String toEmail, String token) {
        String subject = "Reset Your Password Securely";

        String body = "Dear Valued User,\n\n"
                + "We received a request to reset the password associated with this email address.\n\n"
                + "To proceed with resetting your password, please click the secure link below:\n\n"
                + "🔐 Reset Password: http://localhost:5173/reset-password?token=" + token + "\n\n"
                + "If you did not initiate this request, please ignore this email. "
                + "Your account remains safe and no changes will be made.\n\n"
                + "For your protection, this link will expire in 30 minutes.\n\n"
                + "Best regards,\n"
                + "HIMS Security Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";

        sendEmail(toEmail, subject, body);
    }

    public void sendPolicyApprovalEmail(String toEmail, String userName, String policyNumber) {
        String subject = "🏠 Your Policy Has Been Approved!";

        String body = "Dear " + userName + ",\n\n"
                + "We are pleased to inform you that your insurance policy (Policy Number: " + policyNumber + ") has been successfully approved.\n\n"
                + "✅ You can now access the policy details by logging into your HIMS dashboard.\n\n"
                + "If you have any questions or need further assistance, feel free to reach out to our support team.\n\n"
                + "Thank you for trusting HIMS for your insurance needs.\n\n"
                + "Warm regards,\n"
                + "HIMS Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";

        sendEmail(toEmail, subject, body);
    }

    public void sendPolicyRejectionEmail(String toEmail, String userName, String policyNumber, String reason) {
        String subject = "⚠️ Your Policy Has Been Rejected";

        String body = "Dear " + userName + ",\n\n"
                + "We regret to inform you that your insurance policy (Policy Number: " + policyNumber + ") has been rejected.\n\n"
                + "📄 Reason for Rejection: " + reason + "\n\n"
                + "If you have already made a payment for this policy, the amount will be refunded to your original payment method within 5–7 business days.\n\n"
                + "You may review your policy submission and consider updating any necessary information.\n"
                + "If you believe this was a mistake or need further assistance, please contact our support team.\n\n"
                + "We appreciate your interest in HIMS and hope to assist you again soon.\n\n"
                + "Sincerely,\n"
                + "HIMS Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";


        sendEmail(toEmail, subject, body);
    }
    
    
    public void sendClaimApprovalEmail(String toEmail, String userName, Long claimId) {
        String subject = "✅ Your Insurance Claim Has Been Approved";

        String body = "Dear " + userName + ",\n\n"
                + "We are pleased to inform you that your insurance claim has been thoroughly reviewed and officially approved by our claims department.\n\n"
                + "This approval confirms that the reported damages and associated details have met the necessary coverage criteria under your policy.\n\n"
                + "📌 You can view the full details of this claim, including the estimated resolution timeline and any associated actions, by logging into your HIMS account.\n\n"
                + "No further action is needed from your side at this moment. We will continue processing your claim and keep you updated with any progress.\n\n"
                + "We appreciate your patience throughout the review process and thank you for trusting HIMS for your home insurance needs.\n\n"
                + "Warm regards,\n"
                + "HIMS Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";

        sendEmail(toEmail, subject, body);
    }

    public void sendClaimRejectionEmail(String toEmail, String userName, Long claimId, String reason) {
        String subject = "❌ Your Insurance Claim Has Been Rejected";

        String body = "Dear " + userName + ",\n\n"
                + "We regret to inform you that your insurance claim has been reviewed and unfortunately does not meet the criteria for approval.\n\n"
                + "📄 Reason for Rejection: " + reason + "\n\n"
                + "Our claims team has assessed all submitted documentation, including the incident details, damage descriptions, and supporting evidence, but the claim was not eligible based on policy coverage or conditions.\n\n"
                + "We understand this may be disappointing. If you believe there has been an error or if additional documentation becomes available, you are welcome to submit an appeal or reach out to our support team.\n\n"
                + "For full transparency, all claim details and decision notes are available in your HIMS account dashboard.\n\n"
                + "Sincerely,\n"
                + "HIMS Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";



        sendEmail(toEmail, subject, body);
    }

    

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);   
        mailSender.send(message);
    } 
    
    
    
}
