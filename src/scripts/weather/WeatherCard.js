import { getCurrentWeather, useWeather } from "../weather/WeatherProvider.js";
import { useActiveUser } from "../users/UserProvider.js";

export const WeatherCard = () => {
  const activeUser = useActiveUser();
  getCurrentWeather(activeUser.zip).then(() => {
    const weather = useWeather();
    console.log("weather: ", weather);

    const roundedTemp = Math.round(weather.main.temp);

    const weatherContainer = document.getElementById("weather");
    weatherContainer.innerHTML = `
    <h1 class='section--header'>
      Weather
    </h1>
    <div class="weather--card">
        <div>${weather.name}</div>
        <div><img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/></div>
        <div>${weather.weather[0].description}</div>
        <div>temp: ${roundedTemp}°</div>
    </div>
    `;
  });
};
