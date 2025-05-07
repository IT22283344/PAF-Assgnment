import React, { useState } from "react";
import { toast } from "react-toastify";

const CommentInput = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleAdd = () => {
    if (!content.trim() && !image) {
      toast.error("Please add a comment or upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    onAdd(formData); // delegate to parent (CommentModal)
    setContent("");
    setImage(null);
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center mb-2">
        <input
          type="text"
          placeholder="Write a comment"
          className="form-control me-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control w-auto"
        />
      </div>
      <button onClick={handleAdd} className="btn btn-primary w-100">
        Add Comment
      </button>
    </div>
  );
};

export default CommentInput;
