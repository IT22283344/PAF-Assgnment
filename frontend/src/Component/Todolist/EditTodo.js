import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/app/todo/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setSteps(response.data.steps);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
        toast.error("Failed to load todo details");
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index].description = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: null, description: "" }]);
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleDeleteStep = (stepId) => {
    if (window.confirm("Are you sure you want to delete this step?")) {
      axios
        .delete(`http://localhost:8080/app/todo/deletestep/${stepId}`)
        .then(() => {
          toast.success("Step deleted successfully!");
          setSteps(steps.filter((step) => step.id !== stepId));
        })
        .catch((error) => {
          console.error("Error deleting step:", error);
          toast.error("Failed to delete step");
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTodo = {
      title,
      steps,
    };

    axios
      .put(`http://localhost:8080/app/todo/${id}`, updatedTodo)
      .then(() => {
        toast.success("Todo updated successfully!");
        navigate("/usertodo");
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        toast.error("Update failed");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      axios
        .delete(`http://localhost:8080/app/todo/delete/${id}`)
        .then(() => {
          toast.success("Todo deleted successfully!");
          navigate("/usertodo");
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
          toast.error("Failed to delete todo");
        });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Edit Todo</h2>
        <form onSubmit={handleUpdate}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              style={styles.input}
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter Todo Title"
            />
          </div>

          <h4 style={styles.stepsHeader}>Steps:</h4>
          {steps.map((step, index) => (
            <div key={step.id || index} style={styles.inputGroup}>
              <input
                type="text"
                style={styles.input}
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              />
              <button
                type="button"
                style={styles.iconButton}
                onClick={() => step.id ? handleDeleteStep(step.id) : handleRemoveStep(index)}
                title="Delete Step"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.addButton}
              onClick={handleAddStep}
            >
              <FaPlus /> Add Step
            </button>

            <button type="submit" style={styles.saveButton}>
              <FaSave /> Update Todo
            </button>

            <button
              type="button"
              style={styles.deleteButton}
              onClick={handleDelete}
            >
              <FaTrash /> Delete Todo
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    padding: "2rem",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#0d6efd",
    marginBottom: "1.5rem",
    fontWeight: "700",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
  stepsHeader: {
    fontSize: "1.25rem",
    color: "#495057",
    marginBottom: "0.75rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#dc3545",
    cursor: "pointer",
  },
  addButton: {
    backgroundColor: "#198754",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
};

export default EditTodo;
