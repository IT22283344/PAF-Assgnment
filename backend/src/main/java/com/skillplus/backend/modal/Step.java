package com.skillplus.backend.modal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private boolean completed = false;

    private String description;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    @JsonBackReference
    private Todo todo;


    // Getters and setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Todo getTodo() { return todo; }

    public void setTodo(Todo todo) { this.todo = todo; }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

}
