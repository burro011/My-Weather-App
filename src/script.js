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
function searchCity(city) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitutde;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metic`;
  
  axios.get(apiUrl).then(displayWeather);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//Weather of searched city
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-today").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
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
searchForm.addEventListener("submit", searching);

let currentLocationButton = document.querySelector("#currentCityButton");
currentLocationButton.addEventListener("click", currentPosition);
