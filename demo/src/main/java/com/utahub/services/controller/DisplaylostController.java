package com.utahub.services.controller;

import java.awt.PageAttributes.MediaType;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import com.utahub.services.model.Lostitem;
import com.utahub.services.repository.LostItemRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class DisplaylostController {
	private static final Logger logger = LoggerFactory.getLogger(DisplaylostController.class);
	
    @Autowired
    LostItemRepository lostitemRepository;
    
    @GetMapping(value = "/getlostProducts")
    public List<Lostitem> getlostProducts(){
    	logger.info("Sending Lost and Found Items.");
    	return lostitemRepository.findAll();
    }
    
   
}
