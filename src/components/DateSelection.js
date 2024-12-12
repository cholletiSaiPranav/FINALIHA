import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DateSelection.css';

const DateSelection = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_date: selectedDate }),
      });

      if (!response.ok) throw new Error("Failed to fetch forecast data");

      const data = await response.json();
      navigate('/forecast-visualization', { 
        state: { 
          forecastData: data, 
          isMonthly: false 
        } 
      });
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  return (
    <div className="forecast-page">
      <h1>Forecast Page</h1>
      <div className="forecast-container">
        <p>Please select a date to view the forecast:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedDate}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DateSelection; 