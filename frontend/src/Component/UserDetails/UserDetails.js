import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiArrowLeft, FiTrash2, FiMail, FiPhone, FiLock, FiUser } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");
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
    <div className="container-fluid min-vh-100 bg-light p-0">
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Cover Photo */}
      <div 
        className="cover-photo position-relative" 
        style={{
          height: "250px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}
      >
        <button 
          onClick={back}
          className="btn btn-light rounded-circle position-absolute top-3 start-3"
          style={{ width: "40px", height: "40px" }}
        >
          <FiArrowLeft size={20} />
        </button>
      </div>

      {userDetails.map((user, id) => (
        <div className="container position-relative" key={id} style={{ marginTop: "-80px" }}>
          {/* Profile Card */}
          <div className="card shadow-lg border-0 mb-5" style={{ borderRadius: "20px" }}>
            <div className="card-body p-4">
              {/* Profile Header */}
              <div className="d-flex flex-column align-items-center text-center mb-4">
                <div className="position-relative mb-3">
                  <img
                    src={user.profileImage || "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"}
                    alt="User"
                    className="rounded-circle border border-4 border-white"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 border border-3 border-white">
                    <FiEdit color="white" size={16} />
                  </div>
                </div>
                
                <div>
                  <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
                    {user.username}
                    <RiVerifiedBadgeFill color="#1DA1F2" size={20} />
                  </h2>
                  <p className="text-muted mb-3">@{user.username.toLowerCase().replace(/\s/g, '')}</p>
                  
                </div>
              </div>

              {/* Stats */}
              <div className="d-flex justify-content-around text-center my-4 py-3 border-top border-bottom">
                <div>
                  <h5 className="fw-bold mb-1">12</h5>
                  <p className="text-muted small mb-0">Posts</p>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">500</h5>
                  <p className="text-muted small mb-0">Followers</p>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">200</h5>
                  <p className="text-muted small mb-0">Following</p>
                </div>
              </div>

              {/* User Details */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">About</h5>
                
                
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-circle bg-primary bg-opacity-10 text-primary">
                      <FiMail size={18} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Email</p>
                      <p className="mb-0">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-circle bg-success bg-opacity-10 text-success">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Phone</p>
                      <p className="mb-0">{user.contact || "+1 (123) 456-7890"}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-circle bg-warning bg-opacity-10 text-warning">
                      <FiLock size={18} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Password</p>
                      <p className="mb-0">••••••••</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={(e) => editDetails(e, user)}
                >
                  <FiEdit size={18} /> Edit Profile
                </button>
                <button
                  className="btn btn-outline-danger rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={userDelete}
                >
                  <FiTrash2 size={18} /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <ToastContainer position="bottom-center" />
      
      <style jsx>{`
        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cover-photo {
          position: relative;
          overflow: hidden;
        }
        .cover-photo::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, transparent, #f8f9fa);
        }
      `}</style>
    </div>
  );
};

export default UserDetails;