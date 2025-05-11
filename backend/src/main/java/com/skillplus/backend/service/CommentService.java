package com.skillplus.backend.service;

import java.util.List;

import com.skillplus.backend.modal.Comment;
import com.skillplus.backend.repository.CommentRepository;
import com.skillplus.backend.repository.PostRepository;
import com.skillplus.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillplus.backend.modal.Post;
import com.skillplus.backend.modal.User;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CommentService {
    private final String path = "C:/Users/pics/";

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    // Add comment
    public Comment addComment(String content, MultipartFile image, Long userId, Long postId) {
        // Validate required fields
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Comment content cannot be empty");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setPost(post);

        // Handle image only if provided
        if (image != null && !image.isEmpty()) {
            // Validate image size
            if (image.getSize() > 5 * 1024 * 1024) { // 5MB limit
                throw new IllegalArgumentException("Image size should be less than 5MB");
            }

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            String filePath = path + "/" + fileName;

            try {
                image.transferTo(new java.io.File(filePath));
                String cimageUrl = "http://localhost:8080/" + fileName;
                comment.setCimageUrl(cimageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload file: " + e.getMessage());
            }
        }

        return commentRepository.save(comment);
    }

    // See comments

    public List<Comment> getComment(Long postId) {

        postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found " + postId));

        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    // delete comment
    public String deleteComment(long commentId, long userId, long postId) {
        // Fetch the comment
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        // Validate post association
        if (!comment.getPost().getId().equals(postId)) {
            throw new IllegalArgumentException("Comment does not belong to the specified post");
        }

        // Check if the user is either the comment owner or the post owner
        boolean isCommentOwner = comment.getUser().getId().equals(userId);
        boolean isPostOwner = comment.getPost().getUser().getId().equals(userId);

        if (!isCommentOwner && !isPostOwner) {
            throw new IllegalArgumentException("You cannot delete this comment");
        }

        // Delete the comment
        commentRepository.delete(comment);
        return "Comment deleted Successfully";
    }

    public Comment editComment(long commentId, long userId, long postId, String newContent) {
        // Validate new content
        if (newContent == null || newContent.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment content cannot be empty");
        }

        // Fetch the comment
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("No comment found."));

        // Validate post association
        if (!comment.getPost().getId().equals(postId)) {
            throw new IllegalArgumentException("Comment does not belong to the specified post");
        }

        // Check if the user is either the comment owner or the post owner
        boolean isCommentOwner = comment.getUser().getId().equals(userId);
        boolean isPostOwner = comment.getPost().getUser().getId().equals(userId);

        if (!isCommentOwner && !isPostOwner) {
            throw new IllegalArgumentException("You cannot edit this comment");
        }

        // Update and save the comment
        comment.setContent(newContent);
        return commentRepository.save(comment);
    }


}