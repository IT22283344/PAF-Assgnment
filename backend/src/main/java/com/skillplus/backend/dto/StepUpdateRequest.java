// src/main/java/com/skillplus/backend/dto/StepUpdateRequest.java
package com.skillplus.backend.dto;

public class StepUpdateRequest {
    private Long stepId;
    private boolean completed;

    public Long getStepId() {
        return stepId;
    }

    public void setStepId(Long stepId) {
        this.stepId = stepId;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }


}
