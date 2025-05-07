import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/"); // redirect to login if not logged in
    }
  }, [username, navigate]);

  return (
    <div className="container text-center py-5">
      <h2>Welcome, {username} 👋</h2>
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={() => navigate("/posts/userdetails")}
        >
          <i className="bi bi-person-circle me-2"></i>Profile
        </button>
        <button
          className="btn btn-success rounded-pill px-4"
          onClick={() => navigate("/usertodo")}
        >
          <i className="bi bi-list-check me-2"></i>My Todos
        </button>
        <button
          className="btn btn-dark rounded-pill px-4"
          onClick={() => navigate("/posts")}
        >
          <i className="bi bi-file-post me-2"></i>My Posts
        </button>
      </div>
    </div>
  );
};

export default UserHomePage;
