// ProductRepository.java
package com.example.PackageManager.repository;

import com.example.PackageManager.model.Product;
import com.example.PackageManager.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBusiness(Business business);
    long   countByBusinessId(Long businessId);
}
