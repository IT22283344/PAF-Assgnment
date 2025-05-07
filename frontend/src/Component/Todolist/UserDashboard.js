import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.profileIcon}>👤</div>

      <button style={styles.button} onClick={() => navigate("/usertodo")}>
        My Todos
      </button>

      <button style={styles.button} onClick={() => navigate("/posts")}>
        My Posts
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
    gap: "20px",
  },
  profileIcon: {
    fontSize: "60px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
  },
};

export default UserDashboard;
