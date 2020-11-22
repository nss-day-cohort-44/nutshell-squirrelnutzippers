/*
  Author: Bryan Nilsen
  Responsibility: This module handles getting the weather data for the user's current
    location and renders a list of weather cards for a 5-day forecast.
    
*/
import { getWeatherFromZip, useWeather } from "../weather/WeatherProvider.js";
import { useActiveUser } from "../users/UserProvider.js";
import { WeatherCard } from "./WeatherCard.js";

let weather;

export const WeatherList = () => {
  const activeUser = useActiveUser();
  getWeatherFromZip(activeUser.zip).then(() => {
    weather = useWeather();
    render();
  });
};

const render = () => {
  const weatherContainer = document.getElementById("weather");
  const weatherAsHTML = weather.forecast.daily
    .slice(0, 5)
    .map((day) => WeatherCard(day))
    .join("");
  weatherContainer.innerHTML = `
  <h1 class='section--header'>
    Weather</div>
  </h1>
  <div>Forecast for: ${weather.city}, ${weather.state}</div>
  <div class="forecast__container">
    ${weatherAsHTML}
  </div>`;
};
