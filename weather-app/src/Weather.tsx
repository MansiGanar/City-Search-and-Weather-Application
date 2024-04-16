// WeatherPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Paper, Box } from "@mui/material";
import SunnyBackground from "./sunny.jpg";
import CloudyBackground from "./clouds.jpg";
import RainyBackground from "./rainy.jpg";

const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b92edfdcf55c1b31fbb57be31aa6f497`
        );
        console.log(process.env.TOKEN);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [cityName]);

  if (!weatherData) {
    return <Box>Loading...</Box>;
  }

  let backgroundImage;
  switch (weatherData.weather[0].main) {
    case "Clear":
      backgroundImage = `url(${SunnyBackground})`;
      break;
    case "Rain":
      backgroundImage = `url(${RainyBackground})`;
      break;
    case "Clouds":
      backgroundImage = `url(${CloudyBackground})`;
      break;
    default:
      backgroundImage = "";
  }

  const paperStyles: React.CSSProperties = {
    height: "100vh",
    backgroundPosition: "center",
    color: "#fff",
    backgroundImage: backgroundImage,
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    textShadow: "2px 2px 4px rgba(0, 200, 950, 1)",
  };
  return (
    <Paper elevation={3} style={paperStyles}>
      <Typography
        gutterBottom
        component="div"
        style={{ fontSize: "3rem", padding: "10px" }}
      >
        Weather in {cityName}
      </Typography>
      <Typography
        variant="body1"
        component="div"
        style={{ fontSize: "2rem", textAlign: "center", padding: "10px" }}
      >
        Temperature: {weatherData.main.temp}°C
      </Typography>
      <Typography
        component="div"
        variant="body1"
        style={{ fontSize: "2rem", textAlign: "center", padding: "10px" }}
      >
        Feels like: {weatherData.main.feels_like}°C
      </Typography>
      <Typography
        component="div"
        variant="body1"
        style={{ fontSize: "2rem", textAlign: "center", padding: "10px" }}
      >
        Humidity: {weatherData.main.humidity}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        style={{ fontSize: "2rem", textAlign: "center", padding: "10px" }}
      >
        Weather: {weatherData.weather[0].description}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        style={{ fontSize: "2rem", textAlign: "center", padding: "10px" }}
      >
        Wind Speed: {weatherData.wind.speed}
      </Typography>
    </Paper>
  );
};

export default WeatherPage;
