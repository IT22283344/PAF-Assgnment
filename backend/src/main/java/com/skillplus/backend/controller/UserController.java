package com.skillplus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillplus.backend.modal.User;
import com.skillplus.backend.service.UserService;

import java.util.List;
// user controller
@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user details
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user.getUsername(), user.getPassword(), user.getEmail(), user.getContact());
    }

    // Login user details
    @PostMapping("/login")
    public User login(@RequestBody User login) {
        return userService.login(login.getUsername(), login.getPassword());
    }

    // Fetch all users except the logged-in one
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Particular user details

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable long userId) {
        return userService.getUserById(userId);
    }

    // Edit details

    @PostMapping("/edituser")
    public User editDetails(@RequestBody User user) {
        return userService.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(),
                user.getContact());
    }

    @DeleteMapping("/delete/{userId}")
    public void delete(@PathVariable long userId, @RequestParam String password) {
        userService.delete(userId, password);
    }
}
