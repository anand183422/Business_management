// PackageEntity.java
package com.example.PackageManager.model;

import jakarta.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "packages")
public class PackageEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String ageLimit;
    //private Float discount;
    private Date startDate;
    private String imageUrl;
    private Date endDate;
    private String validity;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PackageStatus status;

    private String features;

    private String groupDiscount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    @JsonIgnoreProperties({"packages"})  // prevent recursive loop
    private Business business;

    @ManyToMany
    @JoinTable(
        name = "package_features",
        joinColumns = @JoinColumn(name = "package_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnoreProperties({"packages"})  // avoid circular reference
    private List<Product> products;

    // --- Getters and Setters ---
    // ... inside PackageEntity class



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setStartDate(Date startDate){
        this.startDate = startDate;
    }
    public Date getStartDate(){
        return startDate;
    }

    public void setEndDate(Date endDate){
        this.endDate = endDate;
    }
    public Date getEndDate(){
        return endDate;
    }
    
    public void setAgeLimit(String ageLimit){
        this.ageLimit = ageLimit;
    }
    public String getAgeLimit(){
        return ageLimit;
    }
    // public void setDiscount(Float discount){
    //     this.discount = discount;
    // }
    // public Float getDiscount(){
    //     return discount;
    // }
public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public void setGroupDiscount(String groupDiscount){
        this.groupDiscount = groupDiscount;
    }
    public String getGroupDiscount(){
        return groupDiscount;
    }

    public void setFeatures(String features ){
        this.features = features;
    }
    public String getFeatures(){
        return features;
    }
    

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public PackageStatus getStatus() {
        return status;
    }

    public void setStatus(PackageStatus status) {
        this.status = status;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
