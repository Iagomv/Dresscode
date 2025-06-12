package com.dresscode.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dresscode.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<List<User>> findByActive(boolean flag);

    // Count users grouped by role
    @Query("SELECT u.role as role, COUNT(u) as count FROM User u GROUP BY u.role")
    List<Object[]> countByRole();

    // Count users grouped by active status
    @Query("SELECT CASE WHEN u.active = true THEN 'active' ELSE 'inactive' END as activeStatus, COUNT(u) as count FROM User u GROUP BY u.active")
    List<Object[]> countByActiveStatus();
}
