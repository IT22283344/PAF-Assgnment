import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const UserLogin = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((u) => ({ ...u, [id]: value }));
  };

  let navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Server.post("/login", user)
      .then((response) => {
        const loggedUser = response.data;
        localStorage.setItem("userId", loggedUser.id);
        localStorage.setItem("username", loggedUser.username);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/posts");
        }, 1000);
      })
      .catch((e) => {
        const errorMessage =
          e.response?.data || "An unexpected error occurred.";
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
          <div className="row align-items-center justify-content-center">
            {/* Left Column - App Showcase */}
            <div className="col-lg-6 mb-5 mb-lg-0">
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
                  Share Your Skills, <br/>Grow Together
                </h2>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-primary bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-people-fill text-primary" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Connect with professionals in your field
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-success bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-lightbulb-fill text-success" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Discover new learning opportunities
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="me-3 bg-warning bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-graph-up-arrow text-warning" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <p className="m-0" style={{ fontSize: "1.1rem", color: "#4a5568" }}>
                      Advance your career through collaboration
                    </p>
                  </div>
                </div>
                
                
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold mb-3">Welcome Back</h3>
                    <p className="text-muted">Sign in to continue to your SkillConnect account</p>
                  </div>
                  
                  <form onSubmit={Submit}>
                    <div className="mb-4">
                      <label htmlFor="username" className="form-label fw-medium">Username</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-person-fill text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="Enter your username"
                          id="username"
                          onChange={handleChange}
                          value={user.username}
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
                          placeholder="Enter your password"
                          id="password"
                          onChange={handleChange}
                          value={user.password}
                          required
                        />
                      </div>
                     
                    </div>
                    
                    <button 
                      className="btn btn-primary w-100 py-2 fw-bold rounded-pill" 
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                    
                    {error && (
                      <div className="alert alert-danger mt-3 mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                      </div>
                    )}
                  </form>
                  
                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">Don't have an account? 
                      <a href="/signup" className="text-primary fw-medium text-decoration-none ms-1">Sign up</a>
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
                      Continue with Google
                    </button>
                    <button className="btn btn-light border py-2 rounded-pill d-flex align-items-center justify-content-center">
                      <i className="bi bi-github me-2"></i>
                      Continue with GitHub
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

export default UserLogin;