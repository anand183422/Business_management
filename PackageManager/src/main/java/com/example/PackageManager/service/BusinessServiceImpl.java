package com.example.PackageManager.service;

import com.example.PackageManager.dto.CreateBusinessRequest;
import com.example.PackageManager.model.Business;
import com.example.PackageManager.model.User;
import com.example.PackageManager.repository.BusinessRepository;
import com.example.PackageManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired private BusinessRepository businessRepository;

    @Autowired private UserRepository userRepository;

@Override
public Business createBusiness(CreateBusinessRequest request) {
    Optional<User> adminOptional = userRepository.findById(request.getAdminId());
    if (adminOptional.isEmpty()) {
        throw new IllegalArgumentException("Admin not found");
    }

    Business business = new Business();
    business.setName(request.getName());
    business.setDescription(request.getDescription());
    business.setImageUrl(request.getImageUrl());
    business.setEmail(request.getEmail());
    business.setPhone(request.getPhone());
    business.setLocation(request.getLocation());
    business.setAdmin(adminOptional.get());

    return businessRepository.save(business);
}


    @Override
   public List<Map<String, Object>> getAllBusinessesWithAdmin() {
    List<Business> businesses = businessRepository.findAll();

    return businesses.stream().map(b -> {
        Map<String, Object> map = new HashMap<>();
        map.put("id", b.getId());
        map.put("name", b.getName());
        map.put("description", b.getDescription());
        map.put("location", b.getLocation());
        map.put("imageUrl", b.getImageUrl());
        map.put("email", b.getEmail());
        map.put("phone", b.getPhone());

        // Include Admin Info
        if (b.getAdmin() != null) {
            Map<String, Object> adminMap = new HashMap<>();
            adminMap.put("id", b.getAdmin().getId());
            adminMap.put("name", b.getAdmin().getName());
            adminMap.put("email", b.getAdmin().getEmail());
            map.put("admin", adminMap);
        } else {
            map.put("admin", null);
        }

        return map;
    }).collect(Collectors.toList());
}


    @Override
    public Business updateBusiness(Long id, Business business) {
        Business existing = businessRepository.findById(id).orElseThrow();
        existing.setName(business.getName());
        existing.setDescription(business.getDescription());
        return businessRepository.save(existing);
    }

    @Override
    public void deleteBusiness(Long id) {
        businessRepository.deleteById(id);
    }
    @Override
    public long getBusinessCount() {
        return businessRepository.count();
    }

}
