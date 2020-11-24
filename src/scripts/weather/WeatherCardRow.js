import { getEventWeatherFromZip, useEventWeather } from "./WeatherProvider.js";
import { useActiveUser } from "../users/UserProvider.js";
import { useEvents } from "../events/EventProvider.js";

export const WeatherCardRow = (day) => {
  const roundTemp = (temp) => Math.round(temp);

  return `
    <div class="weather--card row card-bkg">
        <div class="weather--icon"><img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png"/></div>
        <div>${day.weather[0].description}</div>
        <div>hi: ${roundTemp(day.temp.max)}°</div>
        <div>lo: ${roundTemp(day.temp.min)}°</div>
    </div>
    `;
};

// EVENT LISTENERS
const eventHub = document.querySelector(".container");

eventHub.addEventListener("eventWeatherClicked", (e) => {
  // get event id / find event
  const eventId = e.detail.eventId;
  const event = useEvents().find((event) => event.id === eventId);
  const dayIndex = e.detail.dayIndex;

  // find weather container on DOM
  const containerId = `event-weather__container--${eventId}`;
  const eventWeatherContainer = document.getElementById(containerId);

  // send event zip to get event weather
  getEventWeatherFromZip(event.zip).then(() => {
    const eventWeather = useEventWeather();
    const weatherDay = eventWeather.forecast.daily[dayIndex];
    const eventWeatherHTML = WeatherCardRow(weatherDay);
    eventWeatherContainer.innerHTML = eventWeatherHTML;
  });
});

// close event weather
eventHub.addEventListener("closeEventWeatherClicked", (event) => {
  const elementId = event.detail.elementId;
  const contentTarget = document.getElementById(elementId);
  contentTarget.innerHTML = "";
});
