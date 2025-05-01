import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import PostList from "./PostList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Server.get("/posts/all")
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        setError(e.message);
        toast.error(e.message);
      });
  }, []);

  const handleDelete = (postId) => {
    Server.delete(`/posts/delete/${postId}?userId=${userId}`)
      .then((response) => {
        toast.success(response.data);
        setPost(post.filter((post) => post.id !== postId));
      })
      .catch((e) => {
        toast.error(
          e.response ? e.response.data : "An unexpected error occurred"
        );
      });
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <Link to="/" className="text-decoration-none">
        <h1 className="text-2xl font-bold tracking-wide font-mono text-primary mb-0">
          <span className="text-danger">S</span>KILL
          <span className="text-danger"> P</span>LUS+
        </h1>
      </Link>
      <div className="d-flex justify-content-between align-items-center sticky-top bg-white shadow-sm p-3 mb-4">
        <h2 className="mb-0">{username}</h2>
        <div>
          <a className="btn btn-dark rounded-pill" href="/posts/createpost">
            <i className="bi bi-pencil"></i> Create Post
          </a>
          <a className="btn btn-dark rounded-pill" href="/todo/createtodo">
            <i className="bi bi-pencil"></i> Create TodoList
          </a>
          <a
            className="btn btn-outline-secondary rounded-pill ms-2"
            href="/posts/userdetails"
          >
            Profile <i className="bi bi-person-circle"></i>
          </a>
        </div>
      </div>
      <hr style={{ margin: "0" }} />

      {/* Error Handling */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Post List */}
      <PostList posts={post} onDelete={handleDelete} />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default UserPost;
