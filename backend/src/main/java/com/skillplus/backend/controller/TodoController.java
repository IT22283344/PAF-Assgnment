package com.skillplus.backend.controller;

import com.skillplus.backend.dto.StepUpdateRequest;
import com.skillplus.backend.dto.TodoAnalyticsResponse;
import com.skillplus.backend.modal.Step;
import com.skillplus.backend.modal.Todo;
import com.skillplus.backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/app/todo")
@CrossOrigin(origins = "http://localhost:3000/")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // Create todo with steps
    @PostMapping("/create")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo.getTitle(), todo.getUserId(), todo.getSteps());
    }

    // Get all todos for a user
    @GetMapping("/user/{userId}")
    public List<Todo> getTodosByUser(@PathVariable Long userId) {
        return todoService.getTodosByUser(userId);
    }

    // Add step to existing todo
    @PostMapping("/addstep")
    public Todo addStep(@RequestBody StepAddRequest request) {
        return todoService.addStepToTodo(request.getTodoId(), request.getDescription());
    }

    // Delete a step
    @DeleteMapping("/deletestep/{stepId}")
    public void deleteStep(@PathVariable Long stepId) {
        todoService.deleteStep(stepId);
    }

    // Delete todo
    @DeleteMapping("/delete/{todoId}")
    public void deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
    }

    // Get one todo
    @GetMapping("{todoId}")
    public Todo getTodo(@PathVariable Long todoId) {
        return todoService.getTodoById(todoId);
    }

    @PostMapping("/step/status")
    public Step updateStepStatus(@RequestParam Long stepId, @RequestParam boolean completed) {
        return todoService.updateStepStatus(stepId, completed);
    }

    @GetMapping("/public")
    public List<Todo> getPublicTodos() {
        return todoService.getAllPublicTodos();
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<String> updateTodo(
            @PathVariable Long todoId,
            @RequestBody Todo updatedTodo) {
        todoService.updateTodo(todoId, updatedTodo);
        return ResponseEntity.ok("Todo updated successfully with new steps (if any).");
    }



    @PutMapping("/step/markcomplete")
    public ResponseEntity<String> updateStep(@RequestBody StepUpdateRequest request) {
        todoService.updateStepStatus(request.getStepId(), request.isCompleted());
        return ResponseEntity.ok("Step status updated.");
    }

    @GetMapping("/analytics/{userId}")
    public ResponseEntity<TodoAnalyticsResponse> getAnalytics(@PathVariable Long userId) {
        return ResponseEntity.ok(todoService.getAnalyticsForUser(userId));
    }

    @GetMapping("/progress/{todoId}")
    public ResponseEntity<Map<String, Object>> getTodoProgress(@PathVariable Long todoId) {
        Todo todo = todoService.getTodoById(todoId);
        List<Step> steps = todo.getSteps();
        int completed = (int) steps.stream().filter(Step::isCompleted).count();
        int total = steps.size();

        Map<String, Object> progress = Map.of(
                "todoTitle", todo.getTitle(),
                "completedSteps", completed,
                "totalSteps", total,
                "percentage", total == 0 ? 0 : (completed * 100 / total)
        );

        return ResponseEntity.ok(progress);
    }




    @PutMapping("/toggleprivacy/{todoId}")
    public ResponseEntity<String> togglePrivacy(@PathVariable Long todoId) {
        todoService.togglePrivacy(todoId);
        return ResponseEntity.ok("Todo privacy updated.");
    }

    @PutMapping("/step/{stepId}/description")
    public ResponseEntity<String> updateStepDescription(
            @PathVariable Long stepId,
            @RequestBody Map<String, String> body) {

        String newDescription = body.get("description");
        todoService.updateStepDescription(stepId, newDescription);
        return ResponseEntity.ok("Step description updated.");
    }









    // Helper DTO class
    public static class StepAddRequest {
        private Long todoId;
        private String description;

        public Long getTodoId() { return todoId; }
        public void setTodoId(Long todoId) { this.todoId = todoId; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
