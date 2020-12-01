package com.utahub.services;

public class RegistrationResponse {
	public boolean registration;
	public String message;
	
	public RegistrationResponse(boolean registrationStatus, String message) {
		this.registration = registrationStatus;
		this.message = message;
	}

	public boolean isRegistration() {
		return registration;
	}

	public void setRegistration(boolean registration) {
		this.registration = registration;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
