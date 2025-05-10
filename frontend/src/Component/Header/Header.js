import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <div className="top-nav">
      <div className="search-container">
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="nav-icons">
        <div className="nav-icon" onClick={() => navigate("/")}>
          <i className="bi bi-house-door-fill"></i>
          <span>Home</span>
        </div>
        <div className="nav-icon">
          <i className="bi bi-people-fill"></i>
          <span>My Network</span>
        </div>
        <div className="nav-icon">
          <i className="bi bi-chat-left-text-fill"></i>
          <span>Messaging</span>
        </div>
        <div className="nav-icon">
          <i className="bi bi-bell-fill"></i>
          <span>Notifications</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
