import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TodoAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/app/todo/analytics/${userId}`)
      .then(res => setAnalytics(res.data))
      .catch(err => console.error("Error fetching analytics:", err));
  }, [userId]);

  if (!analytics) return <p className="text-center mt-10 text-muted">Loading analytics...</p>;

  const stepData = {
    labels: ['Completed', 'Incomplete'],
    datasets: [{
      label: 'Steps',
      data: [analytics.completedSteps, analytics.incompleteSteps],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };

  const todoData = {
    labels: ['Completed', 'Incomplete'],
    datasets: [{
      label: 'Todos',
      data: [analytics.completedTodos, analytics.incompleteTodos],
      backgroundColor: ['#4CAF50', '#F44336'],
    }],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: { size: 13 },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };
// Inside return JSX
return (
  <div className="container my-5">
    <h2 className="text-center mb-5 text-primary">📈 Todo Analytics</h2> {/* more space below main heading */}
    <div className="row justify-content-center">
      <div className="col-md-5 mb-4">
        <h5 className="text-center mb-4">📝 Todos Overview</h5> {/* added mb-4 */}
        <div className="mx-auto" style={{ maxWidth: '260px' }}>
          <Doughnut data={todoData} options={commonOptions} />
        </div>
        <div className="text-center mt-4">
          <p><strong>✔️ Completed:</strong> {analytics.completedTodos}</p>
          <p><strong>❌ Incomplete:</strong> {analytics.incompleteTodos}</p>
        </div>
      </div>

      <div className="col-md-5 mb-4">
        <h5 className="text-center mb-4">🧩 Steps Overview</h5> {/* added mb-4 */}
        <div style={{ height: '280px' }}>
          <Bar data={stepData} options={commonOptions} />
        </div>
        <div className="text-center mt-4">
          <p><strong>✔️ Completed:</strong> {analytics.completedSteps}</p>
          <p><strong>❌ Incomplete:</strong> {analytics.incompleteSteps}</p>
        </div>
      </div>
    </div>
  </div>
);

};

export default TodoAnalytics;
