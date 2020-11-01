package com.utahub.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.utahub.services.model.User;
import com.utahub.services.repository.UserRepository;

public class ApplicationService {
	@Autowired
	UserRepository userRepository;
	
	public User authenticate(String userName, String password) {
		Optional<User> user = userRepository.findByUsername(userName);
		if(user.isPresent()) {
			if(user.get().getPassword().equals(password)) {
				return user.get();
			}
		}
		return null;
	}

}
