import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiArrowLeft, FiTrash2, FiMail, FiPhone, FiLock, FiUser } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./UserDetails.css"; // Create this CSS file for custom styles

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    Server.get(`/user/${userId}`)
      .then((response) => {
        setUserDetails([response.data]);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response?.data || "Something went wrong!");
        setError(e.response?.data);
        setIsLoading(false);
      });
  }, [userId]);

  const back = (e) => {
    e.preventDefault();
    navigate("/posts");
  };

  const editDetails = (e, user) => {
    e.preventDefault();
    navigate("/posts/userdetails/useredit", { state: { user } });
  };

  const userDelete = (e) => {
    e.preventDefault();
    navigate("/posts/userdetails/userdelete");
  };

  if (isLoading) {
    return (
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      {/* Navigation Sidebar */}
      <nav className="app-sidebar">
        <div className="sidebar-header">
          <Link to="/posts" className="logo-link">
            <div className="logo">
              <span className="logo-icon">SP</span>
              <span className="logo-text">SkillPlus+</span>
            </div>
          </Link>
        </div>

        <div className="sidebar-menu">
          <Link to="/posts" className="menu-item active">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>
          <Link to="/network" className="menu-item">
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
          <Link to="/usertodo" className="menu-item">
            <i className="bi bi-list-task"></i>
            <span>Todo</span>
          </Link>

          
        </div>
      </nav>

      <div className="main-content">
        {error && <div className="alert alert-danger">{error}</div>}
        
        {/* Cover Photo */}
        <div className="cover-photo-container">
          <div className="cover-photo">
            <button 
              onClick={back}
              className="back-button"
            >
              <FiArrowLeft size={20} />
            </button>
          </div>
        </div>

        {userDetails.map((user, id) => (
          <div className="profile-container" key={id}>
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-container">
                  <img
                    src={user.profileImage || "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"}
                    alt="User"
                    className="profile-avatar"
                  />
                  <div className="edit-avatar">
                    <FiEdit color="white" size={16} />
                  </div>
                </div>
                
                <div className="profile-info">
                  <h2 className="profile-name">
                    {user.username}
                    <RiVerifiedBadgeFill className="verified-badge" />
                  </h2>
                  <p className="profile-username">@{user.username.toLowerCase().replace(/\s/g, '')}</p>
                  <p className="profile-bio">{user.bio || "Digital creator at SkillPlus+"}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="profile-stats">
                <div className="stat-item">
                  <h5>12</h5>
                  <p>Posts</p>
                </div>
                <div className="stat-item">
                  <h5>500</h5>
                  <p>Followers</p>
                </div>
                <div className="stat-item">
                  <h5>200</h5>
                  <p>Following</p>
                </div>
              </div>

              {/* User Details */}
              <div className="user-details">
                <h5 className="section-title">About</h5>
                
                <div className="detail-item">
                  <div className="detail-icon email">
                    <FiMail size={18} />
                  </div>
                  <div className="detail-content">
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{user.email}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon phone">
                    <FiPhone size={18} />
                  </div>
                  <div className="detail-content">
                    <p className="detail-label">Phone</p>
                    <p className="detail-value">{user.contact || "+1 (123) 456-7890"}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon password">
                    <FiLock size={18} />
                  </div>
                  <div className="detail-content">
                    <p className="detail-label">Password</p>
                    <p className="detail-value">••••••••</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  className="btn btn-primary edit-button"
                  onClick={(e) => editDetails(e, user)}
                >
                  <FiEdit size={18} /> Edit Profile
                </button>
                <button
                  className="btn btn-outline-danger delete-button"
                  onClick={userDelete}
                >
                  <FiTrash2 size={18} /> Delete Account
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
};

export default UserDetails;