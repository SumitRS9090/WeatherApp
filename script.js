"use strict";

const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "13b3fb0f0b2a85ad34b84bd163862264";

const inputName = document.getElementById("input-name");
const searchButton = document.getElementById("search");
const cityName = document.getElementById("city-name");
const currDate = document.getElementById("date");
const currTime = document.getElementById("time");
const cityTemp = document.getElementById("city-temp");
const humidity = document.getElementById("city-hum");
const windSpeed = document.getElementById("city-wind");
const feelsLike = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");
const currWeather = document.getElementById("weather-main");
const weatherImage = document.getElementById("weather-image");
const weatherDisplay = document.getElementById("weather-display");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const initialState = document.getElementById("initial-state");

function updateDateTime() {
  const now = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  currDate.textContent = now.toLocaleDateString("en-US", dateOptions);
  currTime.textContent = now.toLocaleTimeString("en-US", timeOptions);
}

function showLoading() {
  loading.style.display = "block";
  weatherDisplay.style.display = "none";
  errorMessage.style.display = "none";
  initialState.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
  weatherDisplay.style.display = "block";
  initialState.style.display = "none";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  loading.style.display = "none";
  weatherDisplay.style.display = "none";
  initialState.style.display = "none";
}

function setWeatherImage(iconCode) {
  const imageUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherImage.src = imageUrl;
  weatherImage.alt = "Weather icon";
}

async function fetchData() {
  const cityInput = inputName.value.trim();

  if (!cityInput) {
    showError("Please enter a city name");
    return;
  }

  showLoading();

  try {
    const response = await fetch(
      `${url}?q=${cityInput}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("Failed to fetch weather data. Please try again.");
      }
    }

    const data = await response.json();

    cityName.textContent = data.name + ", " + data.sys.country;
    cityTemp.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6);
    feelsLike.textContent = Math.round(data.main.feels_like);
    pressure.textContent = data.main.pressure;
    currWeather.textContent = data.weather[0].description;

    setWeatherImage(data.weather[0].icon);

    updateDateTime();
    hideLoading();
    weatherDisplay.classList.add("show");
    inputName.value = "";
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

searchButton.addEventListener("click", fetchData);

inputName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchData();
  }
});

function initializeApp() {
  weatherDisplay.style.display = "none";
  initialState.style.display = "block";
  updateDateTime();
  inputName.focus();
}

updateDateTime();
setInterval(updateDateTime, 60000);
window.addEventListener("load", initializeApp);
