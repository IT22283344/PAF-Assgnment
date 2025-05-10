import React, { useState } from "react";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const UserCreateTodo = () => {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([{ description: "" }]);
  const navigate = useNavigate();

  const handleAddStep = () => setSteps([...steps, { description: "" }]);

  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index].description = value;
    setSteps(updated);
  };

  const handleRemoveStep = (index) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      userId,
      steps,
    };

    Server.post("/todo/create", payload)
      .then(() => {
        toast.success("Todo created successfully!");
       setTimeout(() => navigate("/usertodo"), 2000);

      })
      .catch((err) => {
        toast.error(err.response?.data || "Failed to create todo");
      });
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <form
        className="border rounded shadow-lg p-4 bg-light w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-3">Create Todo</h2>

        <div className="form-group mb-3">
          <label>Todo Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Steps</label>
          {steps.map((step, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveStep(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={handleAddStep}
          >
            + Add Step
          </button>
        </div>

        <button type="submit" className="btn btn-info w-100">
          Save Todo
        </button>
        <a className="btn btn-dark mt-2 w-100" href="/todo">
          Back
        </a>

        <ToastContainer />
      </form>
    </div>
  );
};

export default UserCreateTodo;
