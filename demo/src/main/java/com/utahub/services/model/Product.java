package com.utahub.services.model;

import java.sql.Blob;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "products", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"productName"})
})
public class Product {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long productId;
	
	@NotBlank
	@Size(max = 60)
	private String productName;
	@NotBlank
	@Size(max = 150)
	private String description;
	@NotBlank
	private String price;
	@NotBlank
	@Lob
	@Basic(fetch = FetchType.EAGER)
	private String picture;
	@NotBlank
	private String quantity;
	@NotBlank
	private String sellerName;
	
	public Product() {}
	
	public Product(String name, String description, String price, String picture, String quantity, String sellerName){
		this.productName = name;
		this.description = description;
		this.price = price;
		this.picture = picture;
		this.quantity = quantity;
		this.sellerName = sellerName;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	
	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
	

}
