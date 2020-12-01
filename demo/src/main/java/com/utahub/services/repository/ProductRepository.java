package com.utahub.services.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.utahub.services.model.Product;
import com.utahub.services.model.Role;
import com.utahub.services.model.RoleName;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
}
