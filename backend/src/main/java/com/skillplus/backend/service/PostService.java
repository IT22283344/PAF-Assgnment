package com.skillplus.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.skillplus.backend.repository.CommentRepository;
import com.skillplus.backend.repository.LikeRepository;
import com.skillplus.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.skillplus.backend.modal.Post;
import com.skillplus.backend.modal.User;

@Service
public class PostService {

    private final String path = "C:/Users/pics/";

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private CommentRepository commentRepository;


    public PostService(PostRepository postRepository, LikeRepository likeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;

    }
    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));
    }

    public Post post(String content, MultipartFile image, User user) {
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Post caption cannot be empty");
        }

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Please select an image");
        }

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        // Save the image to the file system
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        String filePath = path + "/" + fileName; // it is '/' for configure path check app properties

        try {
            image.transferTo(new java.io.File(filePath)); // Save file
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }

        String imageUrl = "http://localhost:8080/" + fileName;

        Post post = new Post();
        post.setContent(content);
        post.setImageUrl(imageUrl); // Store the local file image
        post.setTimestamp(LocalDateTime.now());
        post.setUser(user);

        return postRepository.save(post);

    }

    public List<Post> findByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByTimestampDesc(); // Fetch posts sorted by timestamp
    }

    public void deleteById(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (!post.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You cannot delete this post");
        }

        // Delete comments associated with the post
        commentRepository.deleteByPostId(postId);

        // Delete likes associated with the post
        likeRepository.deleteByPostId(postId);

        // Now delete the post
        postRepository.delete(post);
    }




}
