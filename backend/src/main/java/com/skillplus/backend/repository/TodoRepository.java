
package com.skillplus.backend.repository;

import com.skillplus.backend.modal.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Find all todos for a specific user
    List<Todo> findByUserId(Long userId);
}
