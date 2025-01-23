import { useState } from "react";
import axios from "axios";
import Link from "next/link";

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
    <div style={{ textAlign: "center", padding: "20px", marginBottom: "20px" }}>
      <h1>Погода от Дааани</h1>
      <Link
        href="/"
        style={{
          margin: "20px",
          display: "inline-block",
          fontsize: "20px",
        }}
      >
        На главную
      </Link>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "5px",
            fontsize: "16px",
            borderRadius: "5px",
            border: " 1px solid #ccc",
          }}
        />

        <button
          onClick={fetchWeather}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ищи
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
