package com.HIMS;

import org.springframework.boot.SpringApplication;


import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
@EnableConfigurationProperties


@SpringBootApplication	
public class HomeInsuranceManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeInsuranceManagementSystemApplication.class, args);
		System.out.println("Executed Succesfully");
	}
}