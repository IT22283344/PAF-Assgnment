package com.skillplus.backend.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "follows")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    public Long getId() {
        return id;
    }

    public User getFollower() {
        return follower;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public void setFollowing(User following) {
        this.following = following;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getFollowing() {
        return following;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Follow() {
        this.createdAt = LocalDateTime.now();
    }
}