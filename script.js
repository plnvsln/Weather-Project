//setting TIME and DAY
let now = new Date();
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currenMonth = month[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let timeData = document.querySelector(".time");

timeData.innerHTML = `${hour}:${minute} ${currentDay},<br /> ${currentDate}th of ${currenMonth}`;

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 4">
          <div class="card">
            <img
              src="img/sunrain.png"
              class="card-img-top"
              alt="sunrain"
              style="width: 100px"
            />
            <div class="card-body">
              <h5 class="card-title">${day}</h5>
              <p class="card-text">
                <span id="temp-min">15</span>°C 
                <span id="temp-max">9</span>°C
              </p>
            </div>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//api

function showWeatherInfo(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;

  document.querySelector("#current-temp-digit").innerHTML =
    Math.round(celsiusTemp);
  document.querySelector("#text-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#main-pic")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-pic")
    .setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
}
function searchLocation(position) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
document.querySelector(`#search-form`).addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

document
  .querySelector("#current-location-button")
  .addEventListener("click", getCurrentLocation);

//temperature

function showCelsius(event) {
  event.preventDefault();
  tempC.classList.add("active");
  tempF.classList.remove("active");
  document.querySelector("#current-temp-digit").innerHTML =
    Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  tempC.classList.remove("active");
  tempF.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp-digit");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let tempC = document.querySelector("#tempC-link");
let tempF = document.querySelector("#tempF-link");
tempC.addEventListener("click", showCelsius);
tempF.addEventListener("click", showFahrenheit);

searchCity("Paris");
displayForecast();
