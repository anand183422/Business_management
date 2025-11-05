package com.example.PackageManager.service;

import com.example.PackageManager.dto.CustomerDTO;
import com.example.PackageManager.model.*;
import com.example.PackageManager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AdminService {

     private final  UserRepository userRepository;
    @Autowired private BusinessRepository businessRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private PackageRepository packageRepository;
   public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<Product> getAllProducts(Long adminId) {
        User admin = userRepository.findById(adminId).orElseThrow();
        Business business = businessRepository.findByAdmin(admin).orElseThrow();
        return productRepository.findByBusiness(business);
    }
 
    public long getProductCount(Long businessId) {
        return productRepository.countByBusinessId(businessId);
    }

    // Get Package count by Business ID
    public long getPackageCount(Long businessId) {
        return packageRepository.countByBusinessId(businessId);
    }

    // Count Bookings for a Business
    // public long getBookingCount(Long businessId) {
    //     return bookingRepository.countByBusinessId(businessId);
    // }

    // Calculate Total Revenue for a Business
    // public double getRevenue(Long businessId) {
    //     return bookingRepository.findTotalRevenueByBusinessId(businessId)
    //             .orElse(0.0);
    // }

    public Product createProduct(Product product, Long adminId) {
        User admin = userRepository.findById(adminId).orElseThrow();
        Business business = businessRepository.findByAdmin(admin).orElseThrow();
        product.setBusiness(business);
        product.setCreatedAt(LocalDateTime.now()); 

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

     public List<PackageEntity> getAllPackagesByBusinessId(Long businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));
        return packageRepository.findByBusiness(business);
    }
   public PackageEntity createPackage(Long adminId, PackageEntity packageEntity, List<Long> productIds) {
    User admin = userRepository.findById(adminId).orElseThrow();
    Business business = businessRepository.findByAdmin(admin).orElseThrow();

    packageEntity.setBusiness(business);
    
    List<Product> products = productRepository.findAllById(productIds); // ✅ Now type matches
    packageEntity.setProducts(products);

    return packageRepository.save(packageEntity);
}
 public List<User> getAllCustomers() {
        return userRepository.findByRole(User.Role.VISITOR);
    }

    // ✅ Fetch customers for a specific business
    public List<CustomerDTO> getCustomersByBusiness(Long businessId) {
        return userRepository.findCustomersByBusiness(businessId);
    }
}
