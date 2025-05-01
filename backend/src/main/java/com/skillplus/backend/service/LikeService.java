package com.skillplus.backend.service;

import java.util.List;

import com.skillplus.backend.repository.LikeRepository;
import com.skillplus.backend.repository.PostRepository;
import com.skillplus.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillplus.backend.modal.Like;
import com.skillplus.backend.modal.Post;
import com.skillplus.backend.modal.User;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public Like likePost(long userId, long postId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
        // throw new IllegalArgumentException("You have already liked a post");
        // }

        Like existLike = likeRepository.findByUserIdAndPostId(userId, postId);
        if (existLike != null) {
            likeRepository.delete(existLike);
            return null;
        }

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        return likeRepository.save(like);

    }

    // check all likes
    public List<Like> allLikes() {
        return likeRepository.findAll();
    }

    // get user likes to post

    public List<Like> getLikesByUser(long userId) {
        List<Like> likes = likeRepository.findLikeByUserId(userId);

        // if (likes.isEmpty()) {
        // throw new IllegalArgumentException("No likes found for the user");
        // }
        return likes;
    }

}
