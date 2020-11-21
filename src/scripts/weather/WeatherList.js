/*
  Author: Bryan Nilsen
  Responsibility: This module handles getting the weather data for the user's current
    location and renders a list of weather cards for a 5-day forecast.
    
*/
import { getWeatherFromZip, useWeather } from "../weather/WeatherProvider.js";
import { useActiveUser } from "../users/UserProvider.js";

let weather;

export const WeatherList = () => {
  const activeUser = useActiveUser();
  getWeatherFromZip(activeUser.zip).then(() => {
    weather = useWeather();
    render();
  });
};

const render = () => {
  console.log("weather: ", weather);
};
