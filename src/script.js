//Time and date
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function formatForecastDay(timestamp) {
 let date = new Date(timestamp * 1000);
 let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
 return days[day]; 
}
//Forecast Functions
function getForecast(coordinates) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
          forecastHTML = forecastHTML +`
                <div class="col-2">
                    <div class="weather-forecast-date">
                        ${formatForecastDay(forecastDay.dt)}
                    </div>

                    <img 
                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                    alt=""
                    width="75"
                    class="weather-forecast-icon"
                    />
                    <div class="weather-forecast-temperature">
                       <span class="weather-forecast-high">${Math.round(forecastDay.temp.max)}°</span> <span class="weather-forecast-low">${Math.round(forecastDay.temp.min)}°</span>
                    </div>
                </div>`;
    }});

 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}

//Search engine, replace city name
function searchCity(city) {
  let apiKey = "0146ed6e16dd8f3acb772a638fd1b45a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//Weather of searched city
function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature-today");
  let cityElement= document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let realFeelElement= document.querySelector("#tempFeels");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateNow");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp
  
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  getForecast(response.data.coord);
}

//Calls
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searching);

let currentLocationButton = document.querySelector("#currentCityButton");
currentLocationButton.addEventListener("click", currentPosition);
