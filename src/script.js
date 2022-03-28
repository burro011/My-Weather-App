//Time and date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#dateNow");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//Search engine, replace city name
function search(event) {
  event.preventDefault();
  let city = document.querySelector("city-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition)
}
function searchLocation(position) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitutde}&appid=${apiKey}&units=metic`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//Weather of searched city
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-today").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather.[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#tempFeels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#tempHigh").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#tempLow").innerHTML = Math.round(response.data.main.temp_min);
}
//Celsius-Fahrenheit converstion
function convertToFahrenheit(event) {
  let temperatureElement = document.querySelector("#temperature-today");
  event.preventDefault();
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  let temperatureElement = document.querySelector("#temperature-today");
  event.preventDefault();
  temperatureElement.innerHTML = 19;
}
//Calls
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#currentCityButton");
currentLocationButton.addEventListener("click", currentPosition);

searchCity("New York");