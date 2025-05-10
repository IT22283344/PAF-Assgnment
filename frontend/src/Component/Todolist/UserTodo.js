import React, { useEffect, useState } from "react";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const UserTodo = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodoId, setExpandedTodoId] = useState(null);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    Server.get(`/todo/user/${userId}`)
      .then((res) => setTodos(res.data))
      .catch((err) => toast.error(err.response?.data || "Failed to fetch todos"));
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

  const toggleExpand = (todoId) => {
    setExpandedTodoId(expandedTodoId === todoId ? null : todoId);
    setSelectedStepId(null); // Reset step selection
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
        todos.map((todo) => {
          const totalSteps = todo.steps.length;
          const completedSteps = todo.steps.filter((s) => s.completed).length;
          const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

          return (
            <div key={todo.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleExpand(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0">{todo.title}</h5>
                  <div className="d-flex align-items-center" style={{ minWidth: "150px" }}>
                    <div className="progress me-2" style={{ width: "80px", height: "8px" }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${progress}%`, height: "100%" }}
                      ></div>
                    </div>
                    <small className="text-muted">{progress}%</small>
                    <span
                      className={`badge ms-3 ${todo.publiclyVisible ? "bg-success" : "bg-secondary"}`}
                    >
                      {todo.publiclyVisible ? "Public" : "Private"}
                    </span>
                  </div>
                </div>

                {expandedTodoId === todo.id && (
                  <>
                    <div className="mt-3">
                      {todo.steps.map((step) => {
                        const isSelected = selectedStepId === step.id;
                        return (
                          <div
                            key={step.id}
                            className={`ms-3 mb-2 d-flex align-items-center justify-content-between bg-light px-3 py-2 rounded ${
                              isSelected ? "border border-primary bg-opacity-75" : ""
                            }`}
                            onClick={() =>
                              setSelectedStepId(isSelected ? null : step.id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={step.completed}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleStepCompleteToggle(step.id, step.completed);
                                }}
                              />
                              <span
                                className={`${step.completed ? "text-success" : ""} ${
                                  isSelected ? "text-primary fw-semibold" : ""
                                }`}
                              >
                                {step.description}
                              </span>
                            </div>
                            <button
                              className="btn btn-sm btn-link text-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStepDelete(step.id);
                              }}
                              title="Delete Step"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

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
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      <ToastContainer />
    </div>
  );
};

export default UserTodo;
