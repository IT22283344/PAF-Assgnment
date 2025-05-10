import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import PostList from "./PostList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./UserPost.css";

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [users, setuser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const userAvatar =
    localStorage.getItem("avatar") ||
    "https://randomuser.me/api/portraits/men/32.jpg";
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Server.get("/posts/all")
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        toast.error(e.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Server.get("/all")
      .then((response) => {
        setuser(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        toast.error(e.message);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
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
    }
  };

  const filteredPosts = post.filter(
    (p) =>
      p.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = (id) => {
    setuser((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };
  

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <nav className="app-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo">
              <span className="logo-icon">SP</span>
              <span className="logo-text ">SkillPlus+</span>
            </div>
          </Link>
        </div>

        <div className="sidebar-menu">
          <div className="menu-item active">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </div>
          <div className="menu-item">
            <i className="bi bi-people-fill"></i>
            <span>Network</span>
          </div>
          <div className="menu-item">
            <i className="bi bi-chat-left-text-fill"></i>
            <span>Messaging</span>
          </div>
          <div className="menu-item">
            <i className="bi bi-bell-fill"></i>
            <span>Notifications</span>
          </div>

          <div className="menu-divider"></div>

          <div
            className="menu-item"
            onClick={() => navigate("/posts/createpost")}
          >
            <i className="bi bi-plus-square-fill"></i>
            <span>Create Post</span>
          </div>
          <div className="menu-item" onClick={() => navigate("/usertodo")}>
            <i className="bi bi-list-task"></i>
            <span>Todo</span>
          </div>
        </div>

        <div className="user-profile">
          <img src={userAvatar} alt={username} className="profile-image" />
          <div className="profile-info">
            <span className="profile-name">{username}</span>
            <span
              className="profile-title"
              onClick={() => navigate("/posts/userdetails")}
            >
              View Profile
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {/* Top Navigation */}
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
            <div className="nav-icon">
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

        {/* Content Area */}
        <div className="content-container">
          {/* Left Sidebar */}
          <div className="left-sidebar">
            <div className="profile-card">
              <div className="profile-banner"></div>
              <div className="profile-content">
                <img
                  src={userAvatar}
                  alt={username}
                  className="profile-avatar"
                />
                <h3>{username}</h3>
                <p className="profile-description">
                  Digital Creator at SkillPlus+
                </p>

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

            <div className="sidebar-section">
              <h4>Recent</h4>
              <div className="recent-item">
                <div className="recent-icon">
                  <i className="bi bi-hash"></i>
                </div>
                <span>#webdevelopment</span>
              </div>
              <div className="recent-item">
                <div className="recent-icon">
                  <i className="bi bi-hash"></i>
                </div>
                <span>#javascript</span>
              </div>
              <div className="recent-item">
                <div className="recent-icon">
                  <i className="bi bi-hash"></i>
                </div>
                <span>#reactjs</span>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="main-feed">
            {/* Create Post Card */}
            <div className="create-post-card">
              <div className="post-header">
                <img src={userAvatar} alt={username} className="post-avatar" />
                <button
                  className="post-input"
                  onClick={() => navigate("/posts/createpost")}
                >
                  Start a post...
                </button>
              </div>

              <div className="post-actions">
                <button className="post-action">
                  <i className="bi bi-image" style={{ color: "#70B5F9" }}></i>
                  <span>Photo</span>
                </button>
                <button className="post-action">
                  <i
                    className="bi bi-play-btn"
                    style={{ color: "#7FC15E" }}
                  ></i>
                  <span>Video</span>
                </button>
                <button className="post-action">
                  <i
                    className="bi bi-calendar-event"
                    style={{ color: "#E7A33E" }}
                  ></i>
                  <span>Event</span>
                </button>
                <button className="post-action">
                  <i
                    className="bi bi-newspaper"
                    style={{ color: "#FC9295" }}
                  ></i>
                  <span>Write Article</span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your posts...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="error-state">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <p>{error}</p>
              </div>
            )}

            {/* Post List */}
            <PostList posts={filteredPosts} onDelete={handleDelete} />
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            <div className="users-list">
              <h5>People you may know</h5>
              {users
                .filter((user) => user.id !== userId) // Optional: exclude self
                .map((user) => (
                  <div
                    key={user.id}
                    className="user-item d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <strong>{user.username}</strong>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleFollowToggle(user.id)}
                    >
                      {user.isFollowed ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                ))}
            </div>

            <div className="news-card">
              <div className="news-header">
                <h4>News</h4>
                <i className="bi bi-info-circle"></i>
              </div>

              <div className="news-item">
                <div className="news-bullet"></div>
                <div className="news-content">
                  <h5>Tech hiring slows down</h5>
                  <p>2d ago • 5,246 readers</p>
                </div>
              </div>

              <div className="news-item">
                <div className="news-bullet"></div>
                <div className="news-content">
                  <h5>Remote work here to stay</h5>
                  <p>3d ago • 8,135 readers</p>
                </div>
              </div>
            </div>

            <div className="ad-card">
              <h4>Upgrade your skills</h4>
              <p>Learn in-demand skills with SkillPlus+ Premium</p>
              <button className="ad-button">
                <i className="bi bi-lightning-charge-fill"></i>
                <span>Try for free</span>
              </button>
            </div>

            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Accessibility</a>
              <a href="#">Help Center</a>
              <a href="#">Privacy & Terms</a>
              <a href="#">Ad Choices</a>
              <a href="#">Advertising</a>
              <a href="#">Business Services</a>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
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

export default UserPost;
