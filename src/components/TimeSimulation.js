import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TimeSimulation = () => {
  const navigate = useNavigate();
  const [isMonthlyStorage, setIsMonthlyStorage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const fetchForecast = async (type) => {
    setLoading(true);
    setError(null);

    const body =
      type === "year"
        ? { year: selectedYear }
        : { selected_date: selectedDate };

    try {
      const response = await fetch("http://localhost:5000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to fetch forecast data");

      const data = await response.json();
      // Navigate to visualization page with the forecast data
      navigate('/forecast-visualization', { 
        state: { 
          forecastData: data, 
          isMonthly: type === "year" 
        } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Time Simulation</h1>

      <button onClick={() => setIsMonthlyStorage(true)}>Yearly Forecast</button>
      <button onClick={() => setIsMonthlyStorage(false)}>Datewise Forecast</button>

      {isMonthlyStorage && (
        <div>
          <h3>Enter a Year</h3>
          <input
            type="number"
            placeholder="e.g., 2028"
            value={selectedYear}
            onChange={handleYearChange}
          />
          <button onClick={() => fetchForecast("year")}>
            Get Monthly Forecast
          </button>
        </div>
      )}

      {!isMonthlyStorage && (
        <div>
          <h3>Select a Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button onClick={() => fetchForecast("date")}>
            Get 15-Day Forecast
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TimeSimulation;
