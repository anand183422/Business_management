package com.example.PackageManager.dto;

import java.util.Date;
import java.util.List;

import com.example.PackageManager.model.PackageStatus;

public class CreatePackageRequest {
    private String name;
    private String description;
    private double price;
    //private float discount;
    private String ageLimit;
    private String groupDiscount;
    private String features; // JSON string or description of features
    private String imageUrl;
    private Date startDate;
    private Date endDate;
    private String validity;
    private PackageStatus status;
    private Long businessId;
    private List<Long> productIds;

    // --- Getters and Setters ---
    public String getName() {
        return name;
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

    // public float getDiscount() {
    //     return discount;
    // }

    // public void setDiscount(float discount) {
    //     this.discount = discount;
    // }

    public String getAgeLimit() {
        return ageLimit;
    }

    public void setAgeLimit(String ageLimit) {
        this.ageLimit = ageLimit;
    }

    public String getGroupDiscount() {
        return groupDiscount;
    }

    public void setGroupDiscount(String groupDiscount) {
        this.groupDiscount = groupDiscount;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public PackageStatus getStatus() {
        return status;
    }

    public void setStatus(PackageStatus status) {
        this.status = status;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public List<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
    }
}
