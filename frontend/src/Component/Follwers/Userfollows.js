import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus, FiUserCheck, FiArrowLeft } from "react-icons/fi";
import "./UserFollows.css"; // Create this CSS file

const Userfollows = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("suggestions");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const userAvatar = localStorage.getItem("avatar") || "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24=";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await Server.get("/all");
        // Add initial follow status (you might want to get this from your backend)
        const usersWithFollowStatus = response.data.map(user => ({
          ...user,
          isFollowed: false // Default to false, you can update this based on your actual data
        }));
        setUsers(usersWithFollowStatus);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

 const handleFollowToggle = async (id) => {
  try {
    const userToUpdate = users.find(user => user.id === id);
    const isCurrentlyFollowed = userToUpdate.isFollowed;

    if (isCurrentlyFollowed) {
      await Server.delete(`/follow/${userId}/${id}`);
    } else {
      await Server.post(`/follow/${userId}/${id}`);
    }

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, isFollowed: !isCurrentlyFollowed } : user
      )
    );

    toast.success(`Successfully ${isCurrentlyFollowed ? "unfollowed" : "followed"} user`);
  } catch (e) {
    toast.error(e.response?.data || "Failed to update follow status");
  }
};


  const filteredUsers = {
    suggestions: users.filter(user => user.id !== userId && !user.isFollowed),
    following: users.filter(user => user.id !== userId && user.isFollowed),
    followers: users.filter(user => user.id !== userId) // You might need a separate API for this
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <nav className="app-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo">
              <span className="logo-icon">SP</span>
              <span className="logo-text">SkillPlus+</span>
            </div>
          </Link>
        </div>

        <div className="sidebar-menu">
          <Link to="/posts" className="menu-item">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>
          <Link to="/network" className="menu-item active">
            <i className="bi bi-people-fill"></i>
            <span>Network</span>
          </Link>
          <Link to="/messaging" className="menu-item">
            <i className="bi bi-chat-left-text-fill"></i>
            <span>Messaging</span>
          </Link>
          <Link to="/notifications" className="menu-item">
            <i className="bi bi-bell-fill"></i>
            <span>Notifications</span>
          </Link>

          <div className="menu-divider"></div>

          <Link to="/posts/createpost" className="menu-item">
            <i className="bi bi-plus-square-fill"></i>
            <span>Create Post</span>
          </Link>
          <Link to="/todo/createtodo" className="menu-item">
            <i className="bi bi-list-task"></i>
            <span>Todo</span>
          </Link>

          <div className="user-profile">
            <img src={userAvatar} alt={username} className="profile-image" />
            <div className="profile-info">
              <span className="profile-name">{username}</span>
              <Link to="/posts/userdetails" className="profile-title">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        <div className="content-container">
          {/* Left Sidebar - Profile Card */}
          <div className="left-sidebar">
            <div className="profile-card">
              <div className="profile-banner"></div>
              <div className="profile-content">
                <img src={userAvatar} alt={username} className="profile-avatar" />
                <h3>{username}</h3>
                <p className="profile-description">Digital Creator at SkillPlus+</p>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span>Connections</span>
                    <strong>1,234</strong>
                  </div>
                  <div className="stat-item">
                    <span>Followers</span>
                    <strong>567</strong>
                  </div>
                </div>

                <div className="profile-premium">
                  <i className="bi bi-star-fill"></i>
                  <span>Try Premium for free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed - Follow System */}
          <div className="main-feed">
            <div className="network-header">
              <button className="back-button" onClick={() => navigate(-1)}>
                <FiArrowLeft size={20} />
              </button>
              <h2>Manage Your Network</h2>
            </div>

            <div className="network-tabs">
              <button
                className={`tab-button ${activeTab === "suggestions" ? "active" : ""}`}
                onClick={() => setActiveTab("suggestions")}
              >
                Suggestions
              </button>
              <button
                className={`tab-button ${activeTab === "following" ? "active" : ""}`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`tab-button ${activeTab === "followers" ? "active" : ""}`}
                onClick={() => setActiveTab("followers")}
              >
                Followers
              </button>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="error-state">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <p>{error}</p>
              </div>
            ) : (
              <div className="users-container">
                {filteredUsers[activeTab].length > 0 ? (
                  filteredUsers[activeTab].map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-info">
                        <img
                          src={user.avatar || "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="}
                          alt={user.username}
                          className="user-avatar"
                        />
                        <div className="user-details">
                          <h4>{user.username}</h4>
                          <p className="user-title">{user.title || "Member at SkillPlus+"}</p>
                          <p className="user-mutual">
                            {Math.floor(Math.random() * 50) + 1} mutual connections
                          </p>
                        </div>
                      </div>
                      <button
                        className={`follow-button ${user.isFollowed ? "following" : ""}`}
                        onClick={() => handleFollowToggle(user.id)}
                      >
                        {user.isFollowed ? (
                          <>
                            <FiUserCheck /> Following
                          </>
                        ) : (
                          <>
                            <FiUserPlus /> Follow
                          </>
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No {activeTab} to display</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            <div className="sidebar-section">
              <h5>People you may know</h5>
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="suggested-user">
                  <img
                    src={user.avatar || "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="}
                    alt={user.username}
                    className="suggested-avatar"
                  />
                  <div className="suggested-info">
                    <h6>{user.username}</h6>
                    <button
                      className="suggested-follow"
                      onClick={() => handleFollowToggle(user.id)}
                    >
                      {user.isFollowed ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Userfollows;