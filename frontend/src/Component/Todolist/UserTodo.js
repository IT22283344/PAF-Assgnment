import React, { useEffect, useState } from "react";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const UserTodo = () => {
  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    Server.get(`/todo/user/${userId}`)
      .then((res) => setTodos(res.data))
      .catch((err) =>
        toast.error(err.response?.data || "Failed to fetch todos")
      );
  };

  const handleDelete = (todoId) => {
    Server.delete(`/todo/deletestep/${todoId}`)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== todoId));
        toast.success("Todo deleted");
      })
      .catch(() => toast.error("Delete failed"));
  };

  const handleTogglePrivacy = (todoId) => {
    Server.put(`/todo/toggleprivacy/${todoId}`)
      .then(() => {
        toast.success("Privacy updated");
        fetchTodos();
      })
      .catch(() => toast.error("Failed to update privacy"));
  };

  const handleStepCompleteToggle = (stepId, completed) => {
    Server.put("/todo/step/markcomplete", {
      stepId,
      completed: !completed,
    })
      .then(fetchTodos)
      .catch(() => toast.error("Failed to update step status"));
  };

  const handleStepDelete = (stepId) => {
    Server.delete(`/todo/deletestep/${stepId}`)
      .then(() => {
        toast.success("Step deleted");
        fetchTodos();
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">{username}'s Todo List</h2>
        <div>
          <Link to="/todo/createtodo" className="btn btn-success me-2">
            + Create Todo
          </Link>
          <Link to="/todo/analytics" className="btn btn-info">
            📊 Todo Analytics
          </Link>
        </div>
      </div>

      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p>
                Status:{" "}
                <strong>{todo.publiclyVisible ? "Public" : "Private"}</strong>
              </p>

              {todo.steps.map((step) => (
                <div
                  key={step.id}
                  className="ms-3 mb-2 d-flex align-items-center"
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={step.completed}
                    onChange={() =>
                      handleStepCompleteToggle(step.id, step.completed)
                    }
                  />
                  <span
                    className={`me-2 ${
                      step.completed ? "text-success fw-bold" : ""
                    }`}
                  >
                    {step.description}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleStepDelete(step.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}

              <div className="mt-3">
                <Link
                  to={`/todo/edit/${todo.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Edit Todo
                </Link>
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete Todo
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleTogglePrivacy(todo.id)}
                >
                  Toggle Privacy
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ToastContainer />
    </div>
  );
};

export default UserTodo;
