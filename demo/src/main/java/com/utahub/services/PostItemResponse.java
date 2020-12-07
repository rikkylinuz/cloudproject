package com.utahub.services;

public class PostItemResponse {
	public boolean isPosted;
	public String message;
	
	public PostItemResponse(boolean isPosted, String message) {
		this.isPosted = isPosted;
		this.message = message;
	}

	public boolean isPosted() {
		return isPosted;
	}

	public void setPosted(boolean isPosted) {
		this.isPosted = isPosted;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
