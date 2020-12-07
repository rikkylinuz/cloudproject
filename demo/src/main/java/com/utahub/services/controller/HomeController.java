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
import com.utahub.services.ApplicationService;
import com.utahub.services.PostItemResponse;
import com.utahub.services.PostProductResponse;
import com.utahub.services.model.Lostitem;
import com.utahub.services.model.Product;
import com.utahub.services.repository.LostItemRepository;
import com.utahub.services.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class HomeController {
private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
    
    @Autowired
    ApplicationService applicationService;
    
    @Autowired
    ProductRepository productRepository;
    
    @Autowired
    LostItemRepository Lostrepository;
    
    @GetMapping(value = "/getAllProducts")
    public List<Product> getAllProducts(){
    	return productRepository.findAll();
    }

    
    @PostMapping("/postProduct")
    public ResponseEntity<?> postProductForSale(@RequestBody Map<String, Object> postProductRequest) {
    	String productName = postProductRequest.get("productname").toString();
    	String description = postProductRequest.get("description").toString();
    	String price = postProductRequest.get("price").toString();
    	String quantity = postProductRequest.get("quantity").toString();
    	String sellerName = postProductRequest.get("sellername").toString();
    	String picture = postProductRequest.get("picture").toString();
    	logger.info("product name: {} description: {} price: {} quantity: {} sellername: {} picture: {}",
    			productName, description, price, quantity, sellerName, picture);
    	logger.info("picture[0] {}",picture);
    	
    	Product product = new Product(productName, description, price, picture, quantity, sellerName);
    	Product result = productRepository.save(product);
    	System.out.println("Result: "+result);
    	return ResponseEntity.ok(new PostProductResponse(true, "successfully posted item for sale!"));
    }
    
    @PostMapping("/purchaseProduct")
    public ResponseEntity<?> purchaseProduct(@RequestBody Map<String, Object> purchaseProductRequest) {
    	String productName = purchaseProductRequest.get("productname").toString();
    	String productId = purchaseProductRequest.get("productId").toString();
    	String quantity = purchaseProductRequest.get("quantity").toString();
    	String sellerName = purchaseProductRequest.get("sellername").toString();
    	logger.info("product name: {} quantity: {} sellername: {}",
    			productName, quantity, sellerName);
    	
    	Optional<Product> product = productRepository.findById(Long.parseLong(productId));
    	Product p = product.get();
    	p.setQuantity(String.valueOf((Integer.parseInt(p.getQuantity()) - Integer.parseInt(quantity))));
    	Product result = productRepository.save(p);
    	return ResponseEntity.ok(new PostProductResponse(true, "successfully purchased item for sale!"));
    }
    @PostMapping("/postlostitem")
    public ResponseEntity<?> postlostitem(@RequestBody Map<String, Object> postItemRequest) {
    	logger.info("hi");
    	String productName = postItemRequest.get("LostitemName").toString();
    	String description = postItemRequest.get("Lostitemdescription").toString();
    	String sellerName = postItemRequest.get("sellerName").toString();
    	String picture = postItemRequest.get("picture").toString();
    	logger.info("product name: {}  sellername: {} Lostitemdescription : {}  ",
    			productName,sellerName,description);
    	Lostitem items = new  Lostitem(productName, description, picture, sellerName);
    	Lostitem result = Lostrepository.save(items);
    	System.out.println("Result: "+result);
    	return ResponseEntity.ok(new PostItemResponse(true, "successfully purchased item for sale!"));
    }
}
