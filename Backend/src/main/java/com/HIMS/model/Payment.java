package com.HIMS.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;

    private Long policyID;

    @Column(length = 255)  // Increased length for email
    private String userID;  // Changed from Long to String to store email

    private Double amountPaid;

    private LocalDateTime paymentDate;

    private String status;

    private String razorpayOrderId;

    public Payment() {}

    // Getters and Setters
    public Long getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(Long paymentID) {
        this.paymentID = paymentID;
    }

    public Long getPolicyID() {
        return policyID;
    }

    public void setPolicyID(Long policyID) {
        this.policyID = policyID;
    }

    public String getUserID() {  // Changed return type to String
        return userID;
    }

    public void setUserID(String userID) {  // Changed parameter type to String
        this.userID = userID;
    }

    public Double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(Double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }
}