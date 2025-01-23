import axios from "axios";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState([]);

  const cities = ["Nha Trang", "London", "Rome"];

  useEffect(() => {
    const fetchWeatherdata = async () => {
      const apiKey = "a8c2766725aaad25d93d94f5997ebf49";
      const promises = cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
      );

      try {
        const results = await Promise.all(promises);
        setWeatherData(results.map((res) => res.data));
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
    fetchWeatherdata();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Погода</h1>
      <Link
        href="/weather"
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "10px 15px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Узнать погоду
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {weatherData.map((weather) => (
          <div
            key={`weather-${weather.id}`}
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "300px",
              textAlign: "left",
              backgroundColor: "blue",
            }}
          >
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
