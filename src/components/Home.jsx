import React, { useState, useEffect } from "react";
import axios from "axios";
import TemperatureIcon from "../assets/temperature-icon.png";
import HumidityIcon from "../assets/humidity-icon.png";
import WeatherIcon from "../assets/weather-icon.png";
import WindSpeedIcon from "../assets/wind-speed-icon.png";

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;



const Home = () => {
  const [weather, setWeather] = useState({});
  const [selectedCity, setSelectedCity] = useState("peshawar");
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (selectedCity !== "") {
      fetchData(selectedCity);
    }
  }, [selectedCity]);

  const fetchData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`
      );

      setWeather(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Error fetching data: ", error);
      if (error.message === "Request failed with status code 404") {
        setError(`City Not found. Please try again.`);
        return;
      }
      setError(`Error fetching data: ${error.message}. Please try again.`);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      alert("Please enter a City name.");
      return;
    }
    setSelectedCity(searchInput);
    setSearchInput("");
  };

  return (
    <div className="container mx-auto pt-8 text-center">
      <h1 className="text-3xl font-bold ml-10 mb-8 text-left text-blue-950">
        City Weather App
      </h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter a City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mb-4  p-2 border border-gray-300 rounded-lg align-right"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg ml-1"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        weather.main && (
          <div className="text-left p-12 rounded container mx-auto pt-8 text-center">
            <h2 className="text-2xl font-bold pb-2 pl-5">{weather.name}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-around sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={TemperatureIcon}
                  
                  className="w-10 h-10 mr-2"
                />
                <p>Temperature: {Math.floor(weather.main.temp - 273.15)}°C</p>
              </div>
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={WeatherIcon}
                  
                  className="mr-2 w-10 h-10 "
                />
                <p className="text-lg">{weather.weather[0].description}</p>
              </div>

              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={HumidityIcon}
                  
                  className="w-10 h-10 mr-2"
                />
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
              <div className="flex items-center">
                <img
                  src={WindSpeedIcon}
                  
                  className="w-10 h-10 mr-2"
                />
                <p>Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )
      )}
      
      
    </div>
  );
};

export default Home;
