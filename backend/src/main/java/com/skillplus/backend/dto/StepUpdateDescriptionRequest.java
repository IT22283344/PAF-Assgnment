// StepUpdateDescriptionRequest.java
package com.skillplus.backend.dto;

public class StepUpdateDescriptionRequest {
    private Long stepId;
    private String description;

    public Long getStepId() {
        return stepId;
    }

    public void setStepId(Long stepId) {
        this.stepId = stepId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
