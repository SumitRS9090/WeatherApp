"use strict";

const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "13b3fb0f0b2a85ad34b84bd163862264";

const inputname = document.getElementById("input-name");
const submitbutton = document.getElementById("search");
const cityname = document.getElementById("city-name");
const currDate = document.getElementById("date");
const currTime = document.getElementById("time");
const citytemp = document.getElementById("tem");
const humidty = document.getElementById("humidity");
const windspeed = document.getElementById("city-wind");
const currWeather = document.getElementById("weather-main");
console.log(currWeather);

async function fetchdata() {
  const response = await fetch(
    `${url}?q=${inputname.value}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Could not fetch resources");
  }
  const data = await response.json();

  console.log(data.name);
  cityname.textContent = data.name;
  humidty.textContent = data.main.humidity;
  citytemp.textContent = data.main.temp;
  windspeed.textContent = data.wind.speed;
  currWeather.textContent = data.weather[0].description;
  console.log(data.weather[0].description);
}
