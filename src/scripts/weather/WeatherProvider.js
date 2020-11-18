import keys from "../../Settings.js";

export const getWeather = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${keys.weatherKey}`
  )
    .then((response) => response.json())
    .then((parsedWeather) => {
      return parsedWeather.daily.slice(0, 5);
    });
};
