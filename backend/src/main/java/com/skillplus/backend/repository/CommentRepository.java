package com.skillplus.backend.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillplus.backend.modal.Comment;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostIdOrderByCreatedAtDesc(Long postId);

    boolean existsByUserIdAndPostId(long userId, long postId);

    Optional<Comment> findByIdAndUserId(long commentId, long userId);

    @Transactional
    void deleteByPostId(Long postId);


}