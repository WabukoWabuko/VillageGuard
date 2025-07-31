import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/cases', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCases(response.data);
    };
    fetchCases();
  }, []);

  const data = {
    labels: ['Open', 'Closed'],
    datasets: [{
      label: 'Cases by Status',
      data: [
        cases.filter(c => c.status === 'open').length,
        cases.filter(c => c.status === 'closed').length,
      ],
      backgroundColor: ['#3b82f6', '#10b981'],
    }],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-gray-900 p-4 rounded">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default Dashboard;