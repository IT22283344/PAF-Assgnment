import React, { useState, useEffect } from "react";
import Server from "../../Server/Server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mytodolist = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch To-Do Lists from server
    Server.get(`/todos/getall?userId=${userId}`)
      .then((response) => {
        setTodos(response.data); // Set the fetched To-Do Lists
      })
      .catch((e) => {
        setError(e.response ? e.response.data : "An error occurred");
        toast.error(e.response ? e.response.data : "An error occurred");
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your To-Do Lists</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      {todos.length === 0 ? (
        <p className="text-center text-muted">No To-Do Lists found.</p>
      ) : (
        <div className="row">
          {todos.map((todo, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">To-Do #{index + 1}</h5>
                  <ul className="list-group list-group-flush">
                    {JSON.parse(todo.steps).map((step, idx) => (
                      <li key={idx} className="list-group-item">
                        Step {idx + 1}: {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DisplayTodoLists;
