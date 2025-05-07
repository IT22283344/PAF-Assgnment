package com.skillplus.backend.dto;

public class TodoAnalyticsResponse {
    private int totalTodos;
    private int completedTodos;
    private int incompleteTodos;

    public int getTotalTodos() {
        return totalTodos;
    }

    public void setTotalTodos(int totalTodos) {
        this.totalTodos = totalTodos;
    }

    public int getCompletedTodos() {
        return completedTodos;
    }

    public void setCompletedTodos(int completedTodos) {
        this.completedTodos = completedTodos;
    }

    public int getIncompleteTodos() {
        return incompleteTodos;
    }

    public void setIncompleteTodos(int incompleteTodos) {
        this.incompleteTodos = incompleteTodos;
    }

    public int getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(int totalSteps) {
        this.totalSteps = totalSteps;
    }

    public int getCompletedSteps() {
        return completedSteps;
    }

    public void setCompletedSteps(int completedSteps) {
        this.completedSteps = completedSteps;
    }

    public int getIncompleteSteps() {
        return incompleteSteps;
    }

    public void setIncompleteSteps(int incompleteSteps) {
        this.incompleteSteps = incompleteSteps;
    }

    private int totalSteps;
    private int completedSteps;
    private int incompleteSteps;

    // Getters and Setters
}
