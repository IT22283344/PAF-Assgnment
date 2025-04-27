package com.skillplus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillplus.backend.modal.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostId(Long postId);

    boolean existsByUserIdAndPostId(long userId, long postId);


    // craeted the post repository
}