import React, { useState, useEffect } from "react";
import Server from "../../Server/Server";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { toast } from "react-toastify";

const CommentModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Server.get(`/comment/getcomment?postId=${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
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
        toast.success("Comment added successfully!");
      })
      .catch(() => toast.error("Failed to add comment"));
  };
  
  

  const deleteComment = (commentId) => {
    Server.delete(`/comment/deletecomment?commentId=${commentId}&userId=${userId}&postId=${postId}`)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
        toast.success("Comment deleted successfully");
      })
      .catch((e) => toast.error(e.response.data));
  };

  const editComment = (commentId, newContent) => {
    Server.put("/comment/editcomment", {
      commentId: Number(commentId),
      userId: Number(userId),
      postId: Number(postId),
      content: newContent,
    })    
      .then((res) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? res.data : comment
          )
        );
        toast.success("Comment updated successfully");
      })
      .catch((e) => toast.error(e.response?.data || "Failed to update comment"));
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Comments</h4>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <CommentList
              comments={comments}
              onDelete={deleteComment}
              onEdit={editComment}
            />
          </div>
          <div className="modal-footer">
            <CommentInput onAdd={addComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
