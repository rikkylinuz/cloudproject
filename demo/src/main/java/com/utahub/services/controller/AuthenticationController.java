package com.utahub.services.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.utahub.services.ApplicationService;
import com.utahub.services.AuthenticationResponse;
import com.utahub.services.exception.AppException;
import com.utahub.services.model.Role;
import com.utahub.services.model.RoleName;
import com.utahub.services.model.User;
import com.utahub.services.repository.RoleRepository;
import com.utahub.services.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    
    @Autowired
    ApplicationService applicationService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, Object> loginRequest) {
    	String userName = loginRequest.get("username").toString();
    	String password = loginRequest.get("password").toString();
    	logger.info("username: {} , password: {}",userName,password);
        if(userRepository.existsByUsername(userName)) {
        	User user = applicationService.authenticate(userName, password);
            if(user!=null) {
            	logger.info("User authenticated successfully");
            	return ResponseEntity.ok(new AuthenticationResponse(true, user.getUsername()));
            }
        } else {
        	logger.info("User not registered");
        }
        logger.info("User not authenticated, bad credentials");
        return ResponseEntity.ok(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String,Object> signUpRequest) {
    	String userName = signUpRequest.get("username").toString();
    	String password = signUpRequest.get("password").toString();
    	String fullName = signUpRequest.get("fullname").toString();
    	String email = signUpRequest.get("email").toString();
        System.out.println("register input:"+ signUpRequest.get("username").toString());
        System.out.println("register input:"+ signUpRequest.get("password").toString());
        if(userRepository.existsByUsername(userName)) {
            return new ResponseEntity(("Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(email)) {
            return new ResponseEntity(("Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(fullName, userName, email, password);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        logger.info("New user registered successfully");

        return ResponseEntity.ok("User registered successfully");
    }

}
