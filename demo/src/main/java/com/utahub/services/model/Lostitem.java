package com.utahub.services.model;
import java.sql.Blob;


import javax.persistence.Basic;
import javax.persistence.Column;
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
@Table(name = "Lostitem", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"LostitemId"})
})

public class Lostitem {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long LostitemId;
	@Column
	@NotBlank
	@Size(max = 60)
	private String LostitemName;
	@NotBlank
	@Column
	@Size(max = 150)
	private String Lostitemdescription;
	@NotBlank
	@Column
	@Lob
	@Basic(fetch = FetchType.EAGER)
	private String picture;
	@Column
	@NotBlank
	private String sellerName;

	 public Lostitem() {}

public  Lostitem(String name, String description, String picture, String sellerName){
	this.LostitemName = name;
	this.Lostitemdescription = description;
	this.picture = picture;
	this.sellerName = sellerName;
}
public String getProductName() {
	return LostitemName;
}

public void setProductName(String productName) {
	this.LostitemName = productName;
}

public String getDescription() {
	return Lostitemdescription;
}

public void setDescription(String description) {
	this.Lostitemdescription = description;
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


}