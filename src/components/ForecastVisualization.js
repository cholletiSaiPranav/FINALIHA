import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastVisualization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state?.forecastData) {
    navigate('/TimeSimulation');
    return null;
  }

  const { forecastData, isMonthly } = location.state;

  // Data configuration for Water Level graph
  const levelData = {
    labels: isMonthly 
      ? Object.keys(forecastData.monthly_level)
      : Object.keys(forecastData.datewise_level),
    datasets: [
      {
        label: 'Water Level',
        data: isMonthly 
          ? Object.values(forecastData.monthly_level)
          : Object.values(forecastData.datewise_level),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true
      }
    ]
  };

  // Data configuration for Storage graph
  const storageData = {
    labels: isMonthly 
      ? Object.keys(forecastData.monthly_storage)
      : Object.keys(forecastData.datewise_storage),
    datasets: [
      {
        label: 'Storage',
        data: isMonthly 
          ? Object.values(forecastData.monthly_storage)
          : Object.values(forecastData.datewise_storage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
        fill: true
      }
    ]
  };

  // Common options for both graphs
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: isMonthly ? 'Months' : 'Dates'
        }
      }
    }
  };

  // Specific options for each graph
  const levelOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: isMonthly 
          ? `Water Level Forecast for ${forecastData.year}`
          : `Water Level Forecast from ${forecastData.selected_date}`,
      },
    },
    scales: {
      ...commonOptions.scales,
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Water Level'
        }
      }
    }
  };

  const storageOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: isMonthly 
          ? `Storage Forecast for ${forecastData.year}`
          : `Storage Forecast from ${forecastData.selected_date}`,
      },
    },
    scales: {
      ...commonOptions.scales,
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Storage'
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/TimeSimulation')}
        style={{ marginBottom: '20px' }}
      >
        Back to Time Simulation
      </button>
      
      {/* Water Level Graph */}
      <div style={{ marginBottom: '40px' }}>
        <Line options={levelOptions} data={levelData} />
      </div>

      {/* Storage Graph */}
      <div style={{ marginBottom: '40px' }}>
        <Line options={storageOptions} data={storageData} />
      </div>

      {/* Total Storage Information */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h4>{forecastData.total_storage}</h4>
      </div>
    </div>
  );
};

export default ForecastVisualization; 