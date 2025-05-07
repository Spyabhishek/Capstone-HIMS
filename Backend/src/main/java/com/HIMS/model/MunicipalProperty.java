package com.HIMS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "municipal_properties")
public class MunicipalProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "municipality_registration_number", nullable = false)
    private String municipalityRegistrationNumber;

    @Column(name = "address", nullable = false)
    private String address;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMunicipalityRegistrationNumber() {
		return municipalityRegistrationNumber;
	}

	public void setMunicipalityRegistrationNumber(String municipalityRegistrationNumber) {
		this.municipalityRegistrationNumber = municipalityRegistrationNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

    // Getters and setters
}
