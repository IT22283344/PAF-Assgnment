import React, { useState } from "react";
import "./commentlist.css"; // For styling the scroll view

const CommentList = ({ comments, onDelete, onEdit }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const userId = Number(localStorage.getItem("userId"));

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleSaveClick = () => {
    if (editedContent.trim()) {
      onEdit(editingCommentId, editedContent, editedImage);
    }
    setEditingCommentId(null);
    setEditedContent("");
    setEditedImage(null);
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
    setEditedImage(null);
  };

  return comments.length > 0 ? (
    <div className="comment-scroll-box">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item d-flex mb-3">
          {/*<div className="comment-avatar">
            <img
              src={comment.user.profilePicture || "/default-avatar.png"}
              alt="avatar"
              className="rounded-circle"
              style={{ width: 40, height: 40, objectFit: "cover" }}
            />
          </div>*/}
          <div className="comment-content flex-grow-1 ms-3">
            <div className="bg-light p-2 rounded-3 position-relative">
              <div className="d-flex justify-content-between">
                <strong>{comment.user.username}</strong>
                {comment.user.id === userId && (
                  <div className="comment-actions">
                    <i
                      className="bi bi-pencil-square text-primary me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditClick(comment)}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDelete(comment.id)}
                    ></i>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <>
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                    className="form-control mt-2"
                  />
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-1">{comment.content}</p>
                  {comment.cimageUrl && (
                    <img
                      src={comment.cimageUrl}
                      alt="comment-img"
                      className="rounded"
                      style={{
                        maxHeight: "60px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted">No comments yet. Be the first to comment!</p>
  );
};

export default CommentList;
