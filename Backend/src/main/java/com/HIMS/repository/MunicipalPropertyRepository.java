package com.HIMS.repository;

import com.HIMS.model.MunicipalProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MunicipalPropertyRepository extends JpaRepository<MunicipalProperty, Long> {
    boolean existsByMunicipalityRegistrationNumberAndAddress(String municipalityRegistrationNumber, String address);
}
