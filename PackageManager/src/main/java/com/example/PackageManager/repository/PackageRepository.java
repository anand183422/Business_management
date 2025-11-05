// PackageRepository.java
package com.example.PackageManager.repository;

import com.example.PackageManager.model.PackageEntity;
import com.example.PackageManager.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
     List<PackageEntity> findByBusiness(Business business);
      long countByBusinessId(Long businessId);
    
}
