import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Paperclip, Send, X } from "lucide-react";

const CommentInput = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);

  const handleAdd = () => {
    if (!content.trim() && !image) {
      toast.error("Please write something or upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    onAdd(formData);
    setContent("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-4 w-100 max-w-lg mx-auto mt-3 transition-all duration-200 hover:shadow-lg">
      <div className="d-flex align-items-start gap-3">
        {/* Avatar Placeholder */}
        <div className="rounded-circle bg-gradient-to-br from-blue-400 to-purple-500 w-10 h-10 flex-shrink-0" />

        {/* Comment Input Area */}
        <div className="flex-grow-1">
          <div className={`position-relative rounded-3 border ${isFocused ? "border-primary" : "border-light"} transition-all duration-200`}>
            <textarea
              rows={1}
              placeholder="Write a comment..."
              className="form-control p-3 rounded-3 border-0 shadow-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="mt-3 w-100 max-w-sm">
              <div className="position-relative">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="img-fluid rounded-3"
                />
                <button
                  onClick={removeImage}
                  className="position-absolute top-0 end-0 btn btn-danger btn-sm rounded-circle p-1 opacity-0 hover-opacity-100 transition-opacity duration-300"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="d-flex justify-content-between pt-3">
            <label className="d-flex align-items-center text-muted cursor-pointer">
              <Paperclip size={18} className="me-2" />
              <span>Attach Image</span>
              <input
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </label>

            <button
              onClick={handleAdd}
              disabled={!content.trim() && !image}
              className={`btn px-4 py-2 rounded-pill ${content.trim() || image ? "btn-primary" : "btn-secondary"}`}
            >
              <Send size={16} />
              <span className="ms-2">Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
