import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState([]);

  const cities = ["Nha Trang", "Paris", "Hanoi"];

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
    <Layout>
      <div className="container">
        <Link href="/weather" className="weather-link">
          Погода в вашем городе
        </Link>

        <div className="weather-container">
          {weatherData.map((weather) => (
            <div key={`weather-${weather.id}`} className="weather-card">
              <h3>{weather.name}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
