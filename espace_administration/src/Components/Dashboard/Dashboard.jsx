import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Importez le fichier CSS ici

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [personnelStats, setPersonnelStats] = useState([]);
  const [formationStats, setFormationStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const personnelResponse = await axios.get('http://localhost:4000/personnel-stats');
        const formationResponse = await axios.get('http://localhost:4000/formation-stats');
        setPersonnelStats(personnelResponse.data);
        setFormationStats(formationResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des statistiques');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>{error}</p>;

  const totalPersonnel = personnelStats.reduce((acc, item) => acc + item.count, 0);
  const totalEleves = formationStats.reduce((acc, item) => acc + item.count, 0);

  const personnelData = {
    labels: personnelStats.map((item) => item.typePersonnel),
    datasets: [
      {
        label: 'Répartition du Personnel',
        data: personnelStats.map((item) => ((item.count / totalPersonnel) * 100).toFixed(2)),
        backgroundColor: ['#3b82f6', '#f97316', '#10b981', '#eab308'],
      },
    ],
  };

  const formationData = {
    labels: formationStats.map((item) => item.formation),
    datasets: [
      {
        label: 'Répartition des Élèves par Formation',
        data: formationStats.map((item) => ((item.count / totalEleves) * 100).toFixed(2)),
        backgroundColor: ['#3b82f6', '#f97316', '#10b981', '#eab308', '#d946ef', '#22d3ee', '#facc15'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Tableau de Bord - Statistiques</h1>
      <div className="charts-container">
        <div className="chart-box">
          <h2>Répartition du Personnel (%)</h2>
          <div className="chart-container">
            <Doughnut data={personnelData} options={options} />
          </div>
        </div>
        <div className="chart-box">
          <h2>Répartition des Élèves par Formation (%)</h2>
          <div className="chart-container">
            <Doughnut data={formationData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
