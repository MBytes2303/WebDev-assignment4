"use client"; // This directive indicates that we're using this file in a client-side environment.

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const { user, firebaseSignOut } = useUserAuth(); // Assume no need for firebaseSignOut directly here unless a logout feature on this page is desired

  // API Key
  const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  // TODO: Implement fetchWeather function to fetch weather data using the OpenWeatherMap API.
  // Read the documentation of the API provider to understand how to handle the returned JSON object.
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=51.0501&lon=-114.0853&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const weatherResponse = await response.json();
      setWeatherData(weatherResponse);
      console.log("Weather successfully fetched!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // TODO: Implement loadWeather function that calls fetchWeather and sets the returned data into the weather state.
  const loadWeather = () => {
    fetchWeather();
  };

  useEffect(() => {
    // TODO: Check if the user is logged in. If yes, call loadWeather to fetch weather data.
    if (user) {
      loadWeather();
    }
  }, [user]); // Dependency array ensures this effect runs when the user state changes.

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-blue-100">
      <h1 className="text-3xl font-bold mb-4 text-red-800 underline">
        Weather in Calgary
      </h1>
      {user && weatherData ? (
        <div className="bg-blue-300 rounded-lg p-6 drop-shadow-xl w-96">
          {/* TODO: Display the weather information if available. Include temperature and weather condition. */}
          <h2 className="text-3xl font-bold mb-1 text-stone-800 text-center">
            {weatherData.main.temp}°C
          </h2>
          <div className="flex place-content-around text-xl text-stone-800 font-semibold">
            <p>Feels like: {weatherData.main.feels_like}°C</p>
            <p>Min: {weatherData.main.temp_min}°C</p>
            <p>Max: {weatherData.main.temp_max}°C</p>
          </div>

          <div className="flex place-content-between">
            <p className="text-stone-800 font-medium">
              Weather:
              <p>
                {weatherData.weather[0].main},{" "}
                {weatherData.weather[0].description}
              </p>
            </p>
            <p className="text-stone-800 font-medium">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed}km/hr</p>
            </p>
          </div>
          {/* Optional: Display additional weather details as needed. */}

          {/* TODO: If needed, provide a Logout button here or ensure there's a way to navigate back or log out. */}
          <div className="flex place-content-around">
            <button className="mx-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out">
              <Link href="/">Home</Link>
            </button>
            <button
              onClick={loadWeather}
              className="mx-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
            >
              Reload Weather
            </button>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-1xl font-bold mb-4 text-red-500">
            Please log in to see the weather information. <br /> If you are
            signed in, please wait for it to load...
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            <Link href="/">Home</Link>
          </button>
        </>
      )}
    </main>
  );
}
