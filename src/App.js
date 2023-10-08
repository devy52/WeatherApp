import React, { useState } from "react";
import Search from "./components/Search/SearchForm";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import logo from "./assets/logo.png"; // Import the image

import "./styles.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return (
    <div className="App">
      <div className="head">
        <div className="logoDiv"><img src={logo} alt="Logo" className="logo"/></div>
        <div className="dashboard"><h1>Weather Dashboard</h1></div>
        <div className="time"><h2>{time}</h2></div>
      </div>
      <Search onWeatherData={handleWeatherData} />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}

export default App;
