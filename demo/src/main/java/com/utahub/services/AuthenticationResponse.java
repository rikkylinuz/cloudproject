package com.utahub.services;

public class AuthenticationResponse {
	private boolean authentication;
	private String username;
	
	public AuthenticationResponse(boolean b, String uname) {
		this.authentication = b;
		this.username = uname;
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
	
}
