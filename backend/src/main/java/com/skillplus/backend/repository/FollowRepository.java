package com.skillplus.backend.repository;

import com.skillplus.backend.modal.Follow;
import com.skillplus.backend.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowing(User follower, User following);
    void deleteByFollowerAndFollowing(User follower, User following);
    long countByFollowing(User following);
    long countByFollower(User follower);
}