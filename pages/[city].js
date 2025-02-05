import axios from "axios";
import Layout from "../components/Layout";

export default function CityWeather({ weather, city, error }) {
  if (error) {
    return (
      <Layout>
        <div className="error-container">
          <h1>Ошибка</h1>
          <p>Город "{city}" не найден</p>
          <a href="/" className="nav-link">
            На главную
          </a>
        </div>
      </Layout>
    );
  }

  if (!weather) {
    return (
      <Layout>
        <div className="loading-container">
          <h1>Загрузка...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="weather-container">
        <h1>Погода в {city}</h1>
        <div className="weather-card">
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const cities = ["Nha Trang", "London", "Rome"];

  const paths = cities.map((city) => ({
    params: { city: city.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apiKey = "a8c2766725aaad25d93d94f5997ebf49";
  const city = params.city;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    return {
      props: {
        weather: response.data,
        city,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        weather: null,
        city,
        error: "City not found",
      },
    };
  }
}
