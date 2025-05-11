import React, { useState } from "react";
import "./commentlist.css";

const CommentList = ({ comments, onDelete, onEdit }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const userId = Number(localStorage.getItem("userId"));

  // Sort comments by createdAt in descending order (latest first)
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

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

  // Format date as "DD/MM/YYYY HH:mm:ss"
  const formatCommentDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return sortedComments.length > 0 ? (
    <div className="comment-scroll-box">
      {sortedComments.map((comment) => (
        <div key={comment.id} className="comment-item d-flex mb-3">
          <div className="comment-content flex-grow-1 ms-3">
            <div className="bg-light p-2 rounded-3 position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{comment.user.username}</strong>
                  <span className="text-muted small ms-2">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>
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
                  <p className="mb-1 mt-2">{comment.content}</p>
                  {comment.cimageUrl && (
                    <img
                      src={comment.cimageUrl}
                      alt="comment-img"
                      className="rounded mt-2"
                      style={{
                        maxHeight: "200px",
                        maxWidth: "100%",
                        objectFit: "cover"
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
