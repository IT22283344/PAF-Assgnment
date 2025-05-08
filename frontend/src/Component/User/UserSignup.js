import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Server from "../../Server/Server";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
// create a new component for user signup
const UserSignup = () => {
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    email: "",
    contact: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserRegister((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const reset = () => {
    setUserRegister({ username: "", password: "", email: "", contact: "" });
  };

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    Server.post("/register", userRegister)
      .then((response) => {
        setUserRegister({ username: "", password: "", email: "", contact: "" });
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((e) => {
        const errorMessage = e.response?.data || "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            {/* Left Column - App Showcase */}
            <div className="col-lg-6 mb-5 mb-lg-0 d-none d-lg-block">
              <div className="px-4 py-5 text-center text-lg-start">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-4">
                  <div style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(45deg, #4e54c8, #8f94fb)",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                  }}>
                    <i className="bi bi-share text-white" style={{ fontSize: "1.8rem" }}></i>
                  </div>
                  <h1 className="m-0" style={{
                    fontSize: "2.2rem",
                    fontWeight: "700",
                    background: "linear-gradient(45deg, #4e54c8, #8f94fb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    SkillPlus+
                  </h1>
                </div>
                
                <h2 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: "600", color: "#2d3748" }}>
                  Join Our Community <br/>of Professionals
                </h2>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-primary bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-person-plus text-primary" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Connect with like-minded professionals
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-success bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-journal-bookmark-fill text-success" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Showcase your skills and expertise
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="me-3 bg-warning bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-people-fill text-warning" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Collaborate on exciting projects
                    </p>
                  </div>
                </div>
                
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                    <i className="bi bi-code-slash me-2"></i> Developers
                  </div>
                  <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                    <i className="bi bi-brush me-2"></i> Designers
                  </div>
                  <div className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                    <i className="bi bi-bar-chart-line me-2"></i> Analysts
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold mb-1">Create Your Account</h3>
                    <p className="text-muted">Join our professional community today</p>
                  </div>
                  
                  <form onSubmit={handleClick}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label fw-medium">Username</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-person-fill text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="Choose a username"
                          id="username"
                          onChange={handleChange}
                          value={userRegister.username}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-medium">Email</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-envelope-fill text-muted"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control border-start-0"
                          placeholder="your@email.com"
                          id="email"
                          onChange={handleChange}
                          value={userRegister.email}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label fw-medium">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-telephone-fill text-muted"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control border-start-0"
                          placeholder="+1 (123) 456-7890"
                          id="contact"
                          onChange={handleChange}
                          value={userRegister.contact}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-medium">Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock-fill text-muted"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0"
                          placeholder="Create a password"
                          id="password"
                          onChange={handleChange}
                          value={userRegister.password}
                          required
                        />
                      </div>
                      <div className="form-text">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                      </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary py-2 fw-bold rounded-pill" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                     
                    </div>
                    
                    {error && (
                      <div className="alert alert-danger mt-3 mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                      </div>
                    )}
                  </form>
                  
                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">Already have an account? 
                      <a href="/" className="text-primary fw-medium text-decoration-none ms-1">Sign in</a>
                    </p>
                  </div>
                  
                  <div className="d-flex align-items-center my-4">
                    <hr className="flex-grow-1" />
                    <span className="mx-3 text-muted">or</span>
                    <hr className="flex-grow-1" />
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button className="btn btn-light border py-2 rounded-pill d-flex align-items-center justify-content-center">
                      <i className="bi bi-google text-danger me-2"></i>
                      Sign up with Google
                    </button>
                    <button className="btn btn-light border py-2 rounded-pill d-flex align-items-center justify-content-center">
                      <i className="bi bi-github me-2"></i>
                      Sign up with GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UserSignup;