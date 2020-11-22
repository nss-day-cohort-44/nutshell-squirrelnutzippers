/*
  Author: Bryan Nilsen
  Responsibility: This module handles the collection of geolocation and weather data from
    the openweathermap and opendatasoft APIs.
  
  Parameters: zip code, latitude and longitude
    
*/

import keys from "../../Settings.js";

let weather = {};
let eventWeather = {};

// GET LAT/LONG FROM USER/EVENT ZIP CODE
const getGeolocationDataFromZip = (zip) => {
  return fetch(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}`
  )
    .then((response) => response.json())
    .then((parsedData) => {
      const geolocationData = parsedData.records[0].fields;
      return geolocationData;
    });
};

// GET WEATHER FROM API USING LAT/LONG
export const getWeather = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${keys.weatherKey}`
  ).then((response) => response.json());
};

// GET LOCAL WEATHER FROM ZIP
export const getWeatherFromZip = (zip) => {
  return getGeolocationDataFromZip(zip).then((geoData) => {
    weather.city = geoData.city;
    weather.state = geoData.state;
    const lat = geoData.geopoint[0];
    const lon = geoData.geopoint[1];
    return getWeather(lat, lon).then((parsedWeather) => {
      weather.forecast = parsedWeather;
    });
  });
};

export const useWeather = () => {
  return weather;
};

// GET EVENT WEATHER FROM ZIP
export const getEventWeatherFromZip = (zip) => {
  return getGeolocationDataFromZip(zip).then((geoData) => {
    eventWeather.city = geoData.city;
    eventWeather.state = geoData.state;
    const lat = geoData.geopoint[0];
    const lon = geoData.geopoint[1];
    return getWeather(lat, lon).then((parsedWeather) => {
      eventWeather.forecast = parsedWeather;
    });
  });
};

export const useEventWeather = () => {
  return eventWeather;
};
