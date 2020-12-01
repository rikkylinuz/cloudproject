package com.utahub.services;

public class AuthenticationResponse {
	private boolean authentication;
	private String username;
	private String message;
	
	public AuthenticationResponse(boolean b, String uname, String msg) {
		this.authentication = b;
		this.username = uname;
		this.message = msg;
	}
	
	public Boolean getAuthentication() {
		return authentication;
	}
	public void setAuthentication(Boolean authentication) {
		this.authentication = authentication;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setAuthentication(boolean authentication) {
		this.authentication = authentication;
	}
	
	
}
