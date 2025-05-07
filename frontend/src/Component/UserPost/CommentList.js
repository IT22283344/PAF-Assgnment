import React, { useState } from "react";

const CommentList = ({ comments, onDelete, onEdit }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const userId = Number(localStorage.getItem("userId")); // Convert to number for accurate comparison

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setEditedImage(comment.c_image_url);
  };

  const handleSaveClick = () => {
    if (editedContent.trim()) {
      onEdit(editingCommentId, editedContent, editedImage);
    }
    setEditingCommentId(null);
    setEditedContent("");
    setEditedImage("");
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
    setEditedImage("");
  };

  return comments.length > 0 ? (
    comments.map((comment) => (
      <div
        key={comment.id}
        className="d-flex justify-content-between align-items-center mb-2"
      >
        {editingCommentId === comment.id ? (
          <div className="w-100">
            <input
              type="text"
              className="form-control"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              value={editedImage}
              onChange={(e) => setEditedImage(e.target.files[0])}
              className="form-control w-auto"
            />
            <div className="mt-1">
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
          </div>
        ) : (
          <>
            <p className="m-0">
              <strong>{comment.user.username}</strong>: {comment.content}
            </p>
            {console.log(comment.cimageUrl)}
            <div>
              <img
                alt="CommentImage"
                className="card-img-top img-fluid"
                src={comment.cimageUrl}
                style={{
                  maxHeight: "40px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>

            {comment.user.id === userId && (
              <div>
                <i
                  className="bi bi-pencil-square text-primary me-3"
                  onClick={() => handleEditClick(comment)}
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="bi bi-trash text-danger"
                  onClick={() => onDelete(comment.id)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            )}
          </>
        )}
      </div>
    ))
  ) : (
    <p>No comments available</p>
  );
};

export default CommentList;
