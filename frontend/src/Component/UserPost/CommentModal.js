import React, { useState, useEffect } from "react";
import Server from "../../Server/Server";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { toast } from "react-toastify";
import "./comment.css"; // optional if you want animations

const CommentModal = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Server.get(`/comment/getcomment?postId=${postId}`)
      .then((response) => setComments(response.data))
      .catch((e) => toast.error(e.response?.data || "Failed to load comments"));
  }, [postId]);

  const addComment = (formData) => {
    formData.append("userId", userId);
    formData.append("postId", postId);

    Server.post(`/comment/addcomment`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setComments([...comments, response.data]);
        toast.success("Comment added");
      })
      .catch(() => toast.error("Failed to add comment"));
  };

  const deleteComment = (commentId) => {
    Server.delete(`/comment/deletecomment?commentId=${commentId}&userId=${userId}&postId=${postId}`)
      .then(() => {
        setComments(comments.filter((c) => c.id !== commentId));
        toast.success("Comment deleted");
      })
      .catch((e) => toast.error(e.response?.data || "Error deleting comment"));
  };

  const editComment = (commentId, newContent) => {
    Server.put("/comment/editcomment", {
      commentId: Number(commentId),
      userId: Number(userId),
      postId: Number(postId),
      content: newContent,
    })
      .then((res) => {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? res.data : c))
        );
        toast.success("Comment updated");
      })
      .catch((e) => toast.error(e.response?.data || "Error updating comment"));
  };

  return (
    <div className="comment-box">
      <CommentInput onAdd={addComment} />
      <CommentList comments={comments} onDelete={deleteComment} onEdit={editComment} />
    </div>
  );
};

export default CommentModal;
