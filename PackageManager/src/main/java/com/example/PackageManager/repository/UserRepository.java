package com.example.PackageManager.repository;

import com.example.PackageManager.dto.CustomerDTO;
import com.example.PackageManager.model.User;
import com.example.PackageManager.model.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT u.* FROM users u LEFT JOIN businesses b ON u.id = b.admin_id WHERE b.admin_id IS NULL AND u.role = 'ADMIN'", nativeQuery = true)
    List<User> findAdminsWithoutBusiness();
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
   long countByRole(User.Role role);
   List<User> findById(long userId);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role); // Finds all users with given role
    //long countByRole(Role role);
    
    @Query("""
    SELECT new com.example.PackageManager.dto.CustomerDTO(
        u.id,
        u.name,
        u.email,
        MIN(b.visitDate),
        MAX(b.visitDate),
        COUNT(b.id),
        COALESCE(SUM(p.amount), 0),
        'ACTIVE'
    )
    FROM User u
    JOIN Booking b ON u.id = b.userId AND b.status = 'CONFIRMED'
    LEFT JOIN Payment p ON b.id = p.booking.id AND p.status = 'SUCCESS'
    WHERE u.role = 'VISITOR' AND b.businessId = :businessId
    GROUP BY u.id, u.name, u.email
""")
List<CustomerDTO> findCustomersByBusiness(Long businessId);

}
