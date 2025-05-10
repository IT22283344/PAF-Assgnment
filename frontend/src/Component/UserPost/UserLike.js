import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLike = ({ postId }) => {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // ➕ Like count state
console.log(likeCount)
  useEffect(() => {
    // Get user's like status
    Server.get(`/like/userlike?userId=${userId}`)
      .then((response) => {
        const userLikes = response.data;
        setLiked(userLikes.some((like) => like.post.id === postId));
      })
      .catch((e) => toast.error(e.response?.data || "Failed to fetch user likes"));

    // Get total like count
    Server.get(`/like/count?postId=${postId}`)
      .then((response) => {
        setLikeCount(response.data);
      })
      .catch(() => toast.error("Failed to fetch like count"));
  }, [postId, userId]);

  const toggleLike = () => {
    Server.post(`/like/addlike?userId=${userId}&postId=${postId}`)
      .then((response) => {
        const isLiked = response.data === "Liked";
        setLiked(isLiked);
        setLikeCount(prev => isLiked ? prev + 1 : prev - 1); // ➕ Update count
      })
      .catch(() => toast.error("Failed to update like status"));
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={toggleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: liked ? "crimson" : "grey",
            fontSize: "1.2rem",
          }}
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
        <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>{likeCount}</span>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Zoom}
      />
    </>
  );
};

export default UserLike;
