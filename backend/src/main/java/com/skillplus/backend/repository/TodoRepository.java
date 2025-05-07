package com.skillplus.backend.repository;

import com.skillplus.backend.modal.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);
    List<Todo> findByPrivateTodoFalse();

}
