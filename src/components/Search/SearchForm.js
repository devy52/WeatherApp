import React, { useState } from "react";
import { fetchWeatherData, fetchCityData } from "../apiService/apiService";
import { AsyncPaginate } from "react-select-async-paginate";
import "./SearchForm.css";
import {BsSearch} from "react-icons/bs";

const SearchForm = ({ onWeatherData }) => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null); 
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const loadOptions = async (inputValue, prevOptions, additionalParams) => {
    try {
      if (inputValue.trim() !== "") {
        const cityData = await fetchCityData(inputValue);
        const suggestions = cityData.map((data) => ({
          value: data.name,
          label: data.name,
        }));
        return {
          options: suggestions,
          hasMore: false, 
          additionalParams,
        };
      } else {
        setSuggestions([]);
        return {
          options: [],
          hasMore: false,
          additionalParams,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        options: [],
        hasMore: false,
        additionalParams,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWeatherData(city);
      onWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("City not found or an error occurred.");
    }
  };

  const handleSuggestionSelect = (selectedOption) => {
    setSelectedCity(selectedOption); 
    setCity(selectedOption.value); 
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="form">
        <AsyncPaginate
          placeholder="Enter a city or place"
          value={selectedCity} 
          onChange={handleSuggestionSelect} 
          loadOptions={loadOptions}
          className="searchBar"
        />
        <button type="submit" className="searchButton"><BsSearch className="searchIcon"/></button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchForm;
