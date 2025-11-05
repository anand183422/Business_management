package com.example.PackageManager.service;

import com.example.PackageManager.model.Business;
import com.example.PackageManager.dto.CreateBusinessRequest;

import java.util.List;
import java.util.Map;

public interface BusinessService {
    // Accepts DTO instead of Business directly
    Business createBusiness(CreateBusinessRequest request);

    List<Map<String, Object>> getAllBusinessesWithAdmin();

    Business updateBusiness(Long id, Business business);

    void deleteBusiness(Long id);
    long getBusinessCount();

}

