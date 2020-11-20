import keys from "../../Settings.js";

export const getWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=imperial&appid=${keys.weatherKey}`
  )
    .then((response) => response.json())
    .then((parsedWeather) => {
      return parsedWeather.daily.slice(0, 5);
    });
};
