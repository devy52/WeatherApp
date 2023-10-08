import axios from "axios";

const rapidAPIHeaders = {
  "X-RapidAPI-Key": "c49aaee08amsh0ac88534dcb3b53p1b1fb6jsn0b9f3f65a742",
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

export const fetchCitySuggestions = async (inputValue, setSuggestions) => {
  try {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
      {
        headers: rapidAPIHeaders,
      }
    );
    setSuggestions(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchWeatherData = async (city) => {
  try {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_OPENWEATHER_API_KEY`
    );
  } catch (error) {
    throw error;
  }
};

export const fetchCityData = async (name) => {
  const apiKey = "YOUR_NINJA_API_KEY";
  const apiUrl = `https://api.api-ninjas.com/v1/city?name=${name}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
