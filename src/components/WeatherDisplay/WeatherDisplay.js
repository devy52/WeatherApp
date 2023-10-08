import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometer, faTint, faWind } from "@fortawesome/free-solid-svg-icons";
import { GrLocation } from "react-icons/gr";
import {
  WiDaySunny,
  WiDayCloudy,
  WiDayRain,
  WiDaySnow,
  WiDayFog,
  WiDayHaze,
  WiDayThunderstorm,
  WiDayWindy,
  WiDaySprinkle,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
  WiNightSnow,
  WiNightFog,
  WiNightThunderstorm,
  WiNightAltCloudyWindy,
  WiNightSprinkle,
} from "react-icons/wi";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weatherData }) => {
  const [unit, setUnit] = useState("C");

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const convertTemperature = (kelvin) => {
    const celsius = kelvin - 273.15; // Convert from Kelvin to Celsius
    const temperature = unit === "C" ? celsius : convertToFahrenheit(celsius);
    return `${temperature.toFixed(1)} °${unit}`;
  };

  const getWeatherIcon = (description, isDay) => {
    // Define a mapping of weather conditions to icons
    const iconMappings = {
      "Clear": isDay ? <WiDaySunny /> : <WiNightClear />,
      "Clouds": isDay ? <WiDayCloudy /> : <WiNightCloudy />,
      "Rain": isDay ? <WiDayRain /> : <WiNightRain />,
      "Snow": isDay ? <WiDaySnow /> : <WiNightSnow />,
      "Fog": isDay ? <WiDayFog /> : <WiNightFog />,
      "Haze": isDay ? <WiDayHaze /> : <WiNightFog />,
      "Thunderstorm": isDay ? <WiDayThunderstorm /> : <WiNightThunderstorm />,
      "Wind": isDay ? <WiDayWindy /> : <WiNightAltCloudyWindy />,
      "Drizzle": isDay ? <WiDaySprinkle /> : <WiNightSprinkle />,
    };

    const icon = iconMappings[description] || (isDay ? <WiDaySunny /> : <WiNightClear />);
    return icon;
  };

  return (
    <div className="weather-display">
      <div className="grid-container">
        {weatherData.weather && weatherData.weather[0] && (
          <>
            <div className="item1">
              <GrLocation className="locIcon" />
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <div className="item2">
              <div className="item21">{getWeatherIcon(weatherData.weather[0].main, isDayTime(weatherData.sys.sunrise, weatherData.sys.sunset))}</div>
              <div className="item22">{weatherData.weather[0].description.toUpperCase()}</div>
            </div>
            <div className="item3">
              <div className="item31">Temperature</div>
              <div className="item32"><FontAwesomeIcon icon={faThermometer} className="thermometer" /> {convertTemperature(weatherData.main.temp)}</div>
              <button className="button-toggle" onClick={toggleUnit}>
                Celsius / Fahrenheit
              </button>
            </div>
            <div className="item4">
              <div>
                <div>Humidity</div>
                <FontAwesomeIcon icon={faTint} className="tint" /> {weatherData.main.humidity}%
              </div>
            </div>
            <div className="item5">
              <div>
                <div>Wind Speed</div>
                <FontAwesomeIcon icon={faWind} className="wind" /> {weatherData.wind.speed} m/s
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const convertToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const isDayTime = (sunrise, sunset) => {
  const currentTime = new Date().getTime() / 1000; // Convert to seconds
  return currentTime >= sunrise && currentTime <= sunset;
};

export default WeatherDisplay;
