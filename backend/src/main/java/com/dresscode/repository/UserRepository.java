package com.dresscode.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dresscode.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
