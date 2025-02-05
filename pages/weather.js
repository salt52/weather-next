import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "a8c2766725aaad25d93d94f5997ebf49";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Укажите город</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={fetchWeather} className="search-button">
            Ищи
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
