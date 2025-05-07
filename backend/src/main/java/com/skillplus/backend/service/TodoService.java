package com.skillplus.backend.service;

import com.skillplus.backend.dto.TodoAnalyticsResponse;
import com.skillplus.backend.modal.Step;
import com.skillplus.backend.modal.Todo;
import com.skillplus.backend.repository.StepRepository;
import com.skillplus.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private StepRepository stepRepository;

    public Todo createTodo(String title, Long userId, List<Step> steps) {
        Todo todo = new Todo();
        todo.setTitle(title);
        todo.setUserId(userId);
        todo.setSteps(steps);
        return todoRepository.save(todo);
    }

    public List<Todo> getTodosByUser(Long userId) {
        return todoRepository.findByUserId(userId);
    }

    public Todo addStepToTodo(Long todoId, String description) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        Step step = new Step();
        step.setDescription(description);
        step.setTodo(todo);
        todo.getSteps().add(step);

        return todoRepository.save(todo);
    }

    public void deleteStep(Long stepId) {
        stepRepository.deleteById(stepId);
    }

    public void deleteTodo(Long todoId) {
        todoRepository.deleteById(todoId);
    }

    public Todo getTodoById(Long todoId) {
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));
    }

    public Step updateStepStatus(Long stepId, boolean completed) {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new IllegalArgumentException("Step not found"));

        step.setCompleted(completed);
        stepRepository.save(step);

        Todo todo = step.getTodo();
        boolean allStepsCompleted = todo.getSteps().stream().allMatch(Step::isCompleted);
        todo.setCompleted(allStepsCompleted);
        todoRepository.save(todo);

        return step;
    }


    public void togglePrivacy(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setPrivateTodo(!todo.isPrivateTodo());
        todoRepository.save(todo);
    }

    public TodoAnalyticsResponse getAnalyticsForUser(Long userId) {
        List<Todo> todos = todoRepository.findByUserId(userId);

        int completedTodos = 0;
        int incompleteTodos = 0;
        int completedSteps = 0;
        int incompleteSteps = 0;

        for (Todo todo : todos) {
            if (todo.isCompleted()) {
                completedTodos++;
            } else {
                incompleteTodos++;
            }

            List<Step> steps = todo.getSteps();
            for (Step step : steps) {
                if (step.isCompleted()) {
                    completedSteps++;
                } else {
                    incompleteSteps++;
                }
            }
        }

        TodoAnalyticsResponse response = new TodoAnalyticsResponse();
        response.setTotalTodos(todos.size());
        response.setCompletedTodos(completedTodos);
        response.setIncompleteTodos(incompleteTodos);
        response.setTotalSteps(completedSteps + incompleteSteps);
        response.setCompletedSteps(completedSteps);
        response.setIncompleteSteps(incompleteSteps);

        return response;
    }
    public Step updateStepDescription(Long stepId, String newDescription) {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new IllegalArgumentException("Step not found"));

        step.setDescription(newDescription);
        return stepRepository.save(step);
    }

    public void updateTodo(Long todoId, Todo updatedTodo) {
        Todo existingTodo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        existingTodo.setTitle(updatedTodo.getTitle());

        // Update existing steps or add new steps
        if (updatedTodo.getSteps() != null) {
            for (Step updatedStep : updatedTodo.getSteps()) {
                if (updatedStep.getId() != null) {
                    // Update existing step
                    Step step = stepRepository.findById(updatedStep.getId())
                            .orElseThrow(() -> new IllegalArgumentException("Step not found"));
                    step.setDescription(updatedStep.getDescription());
                    stepRepository.save(step);
                } else {
                    // Add new step
                    Step newStep = new Step();
                    newStep.setDescription(updatedStep.getDescription());
                    newStep.setTodo(existingTodo);
                    existingTodo.getSteps().add(newStep);
                }
            }
        }

        todoRepository.save(existingTodo);
    }




    public List<Todo> getAllPublicTodos() {
        return todoRepository.findByPrivateTodoFalse();
    }




}
