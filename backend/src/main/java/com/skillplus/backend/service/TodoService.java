
package com.skillplus.backend.service;

import com.skillplus.backend.modal.Todo;
import com.skillplus.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // Create or update a Todo
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Get a Todo by id
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Get all Todos for a specific user
    public List<Todo> getTodosByUserId(Long userId) {
        return todoRepository.findByUserId(userId);
    }

    // Delete a Todo by id
    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}
