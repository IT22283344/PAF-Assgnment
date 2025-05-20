package com.skillplus.backend.controller;

import com.skillplus.backend.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity<String> followUser(
            @PathVariable Long followerId,
            @PathVariable Long followingId) {
        return ResponseEntity.ok(followService.followUser(followerId, followingId));
    }

    @DeleteMapping("/{followerId}/{followingId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable Long followerId,
            @PathVariable Long followingId) {
        return ResponseEntity.ok(followService.unfollowUser(followerId, followingId));
    }

    @GetMapping("/followers/count/{userId}")
    public ResponseEntity<Long> getFollowerCount(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowerCount(userId));
    }

    @GetMapping("/following/count/{userId}")
    public ResponseEntity<Long> getFollowingCount(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowingCount(userId));
    }
}