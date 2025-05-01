import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddTodoWithSteps = () => {
  const [step, setStep] = useState("");
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();

  // Load steps from localStorage when component mounts
  useEffect(() => {
    const savedSteps = localStorage.getItem("temporarySteps");
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps)); // Parse the saved steps and set them in state
    }
  }, []);

  // Handle input change for each step
  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  // Add a new step to the steps array
  const handleAddStep = () => {
    if (step.trim() === "") {
      toast.error("Step cannot be empty");
      return;
    }
    const newSteps = [...steps, step];
    setSteps(newSteps);
    localStorage.setItem("temporarySteps", JSON.stringify(newSteps)); // Save steps to localStorage
    setStep(""); // Clear the input field
  };

  // Remove a step from the list
  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    localStorage.setItem("temporarySteps", JSON.stringify(newSteps)); // Update localStorage
  };

  // Submit the entire To-Do list
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("steps", JSON.stringify(steps)); // Convert steps array to JSON string

    Server.post(`/todos/create?userId=${userId}`, formData)
      .then((response) => {
        toast.success("To-Do List Created Successfully");
        setSteps([]); // Clear steps after submission
        localStorage.removeItem("temporarySteps"); // Clear the stored steps from localStorage
        setInterval(() => {
          navigate("/todos"); // Redirect to To-Do list page
        }, 2000);
      })
      .catch((e) => {
        setError(e.response ? e.response.data : "An error occurred");
        toast.error(e.response ? e.response.data : "An error occurred");
      });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Create a To-Do List</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label htmlFor="step" className="form-label">
                Add Step
              </label>
              <input
                type="text"
                id="step"
                className="form-control"
                placeholder="Enter a step for your to-do"
                value={step}
                onChange={handleStepChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-success w-100 my-3"
              onClick={handleAddStep}
            >
              Add Step
            </button>

            <div>
              <h5>Steps Added:</h5>
              <ul className="list-group">
                {steps.map((step, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      Step {index + 1}: {step}
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveStep(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-primary w-48">
                Create To-Do List
              </button>
              <a href="/posts" className="btn btn-secondary w-48">
                Back
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoWithSteps;
