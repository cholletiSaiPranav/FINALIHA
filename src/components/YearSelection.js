import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './YearSelection.css';

const YearSelection = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(2028);

  const handleGetForecast = async () => {
    try {
      const response = await fetch("http://localhost:5000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: selectedYear }),
      });

      if (!response.ok) throw new Error("Failed to fetch forecast data");

      const data = await response.json();
      navigate('/forecast-visualization', { 
        state: { 
          forecastData: data, 
          isMonthly: true 
        } 
      });
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  return (
    <div className="year-selection-container">
      <h1 className="title">Time Simulation</h1>
      
      <div className="slider-container">
        <input
          type="range"
          min="2024"
          max="2030"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="year-slider"
        />
        <div className="selected-year">Selected Year: {selectedYear}</div>
      </div>

      <button 
        className="get-forecast-button"
        onClick={handleGetForecast}
      >
        Get Forecast
      </button>
    </div>
  );
};

export default YearSelection; 