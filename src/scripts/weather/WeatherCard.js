import { getWeatherFromZip, useWeather } from "../weather/WeatherProvider.js";
import { useActiveUser } from "../users/UserProvider.js";

export const WeatherCard = (day) => {
  const roundTemp = (temp) => Math.round(temp);

  return `
    <div class="weather--card">
        <div class="weather--icon"><img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png"/></div>
        <div>${day.weather[0].description}</div>
        <div>hi: ${roundTemp(day.temp.max)}°</div>
        <div>lo: ${roundTemp(day.temp.min)}°</div>
    </div>
    `;
};
