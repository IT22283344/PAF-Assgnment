package com.skillplus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.skillplus.backend.modal.Comment;
import com.skillplus.backend.service.CommentService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/app/comment")
@CrossOrigin(origins = "http://localhost:3000/")

public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/addcomment")
    public Comment addComment(
            @RequestParam("content") String content,
            @RequestParam("userId") Long userId,
            @RequestParam("postId") Long postId,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        return commentService.addComment(content, image, userId, postId);
    }


    @GetMapping("/getcomment")
    public List<Comment> getComment(@RequestParam Long postId) {
        return commentService.getComment(postId);
    }

    @DeleteMapping("/deletecomment")
    public String deleteComment(@RequestParam("commentId") long commentId, @RequestParam("userId") long userId,
            @RequestParam("postId") long postId) {
        commentService.deleteComment(commentId, userId, postId);
        return "Comment deleted successfully";
    }


    @PutMapping("/editcomment")
    public ResponseEntity<?> editComment(@RequestBody Map<String, Object> requestData) {
        try {
            Long commentId = ((Number) requestData.get("commentId")).longValue();
            String newContent = (String) requestData.get("content");
            Long postId = ((Number) requestData.get("postId")).longValue();
            Long userId = ((Number) requestData.get("userId")).longValue();

            if (newContent == null || newContent.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Updated comment content cannot be empty");
            }

           Comment updatedComment = commentService.editComment(commentId, userId, postId, newContent );
            return ResponseEntity.ok(updatedComment);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error editing comment: " + e.getMessage());
        }
    }


}
