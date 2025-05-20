package com.skillplus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillplus.backend.modal.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByContact(String contact);

    User findByUsername(String username);

    List<User> findTop5ByIdNotOrderByIdDesc(Long id);


}
