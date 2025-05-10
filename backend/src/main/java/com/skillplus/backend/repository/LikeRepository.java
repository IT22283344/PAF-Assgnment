package com.skillplus.backend.repository;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillplus.backend.modal.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findLikeByUserId(Long userId);

    List<Like> findByPostId(Long postId);

    boolean existsByPostId(long postId);

    Boolean existsByUserIdAndPostId(Long userId, long postId);


    Like findByUserIdAndPostId(Long userId, Long postId);

    long countByPostId(Long postId);

    @Transactional
    void deleteByPostId(Long postId);


}
