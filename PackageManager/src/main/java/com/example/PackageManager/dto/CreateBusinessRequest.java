package com.example.PackageManager.dto;

public class CreateBusinessRequest {
    public String name;
    public String description;
    public String location;
    public String imageUrl;
    public String email;
    public String phone;
    public Long adminId;
    
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
    public String getLocation(){
        return location;
    }
    public void setLocation(String location){
        this.location = location;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

   public String getPhone(){
    return phone;
   }
   public void setPhone(String phone){
    this.phone = phone;
   }

    public Long getAdminId() {
        return adminId;
    }
    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
    public String getImageUrl(){
        return imageUrl;
    }
    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }
}

