import keys from "../../Settings.js";

let weather;

export const getCurrentWeather = (zip) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${keys.weatherKey}`
  )
    .then((response) => response.json())
    .then((parsedWeather) => {
      weather = parsedWeather;
    });
};

export const useWeather = () => {
  return weather;
};
