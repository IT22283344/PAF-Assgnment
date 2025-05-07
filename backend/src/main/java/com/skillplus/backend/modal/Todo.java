package com.skillplus.backend.modal;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private boolean completed = false;

    @Column(nullable = false)
    private boolean privateTodo = false;


    private Long userId; // store user ID instead of User object

    @OneToMany(mappedBy = "todo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Step> steps;


    // Getters and setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public List<Step> getSteps() { return steps; }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean isPrivateTodo() {
        return privateTodo;
    }

    public void setPrivateTodo(boolean privateTodo) {
        this.privateTodo = privateTodo;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
        if (steps != null) {
            for (Step step : steps) {
                step.setTodo(this);
            }
        }
    }
}
