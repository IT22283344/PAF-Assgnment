package com.skillplus.backend.controller;

import java.util.List;

import com.skillplus.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.skillplus.backend.modal.Post;
import com.skillplus.backend.modal.User;
import com.skillplus.backend.service.PostService;

@RestController
@RequestMapping("/app/posts")
@CrossOrigin(origins = "http://localhost:3000/")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public Post create(@RequestParam("content") String content,
            @RequestParam("image") MultipartFile image,
            @RequestParam Long userId) {

        // Fetch user data by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return postService.post(content, image, user);
    }

    @GetMapping("/all")
    public List<Post> allPost() {
        return postService.getAllPosts();
    }

    @GetMapping("/users/{userId}")
    public List<Post> userPost(@PathVariable Long userId) {
        return postService.findByUser(userId);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId, @RequestParam Long userId) {
        try {
            postService.deleteById(postId, userId);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }


}
