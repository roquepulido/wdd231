const apiKey = "d36f27cbcf934a43be27d2f7e20e7cf2";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=20.97&lon=-89.62&units=imperial&appid=${apiKey}`;
// const url = "./data/test.json";
async function apiFetch(url) {
  const response = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  printWeatherData(response);
}

const printWeatherData = (data) => {
  const todayContainer = document.getElementById("today-weather");
  const forecastContainer = document.getElementById("forecast-weather");
  todayContainer.innerHTML = `
  <h3>Current Weather</h3>
  <span>${data.list[0].main.temp} &deg;F - ${data.list[0].weather[0].description}</span>
  <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="${data.list[0].weather[0].description}" />
  `;
  
  forecastContainer.innerHTML = `
  <h3>Forecast 3 days</h3>
  <div class="forecast">
    <div>
      <span> ${data.list[8].main.temp} °F </span>
      <img src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png" alt="${data.list[8].weather[0].description}" />
      <span>  ${new Date(data.list[8].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })} </span>
    </div>
    <div>
      <span> ${data.list[16].main.temp} °F </span>
      <img src="https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png" alt="${data.list[16].weather[0].description}" />
      <span>  ${new Date(data.list[16].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })} </span>
    </div>
    <div>
      <span> ${data.list[24].main.temp} °F </span>
      <img src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png" alt="${data.list[24].weather[0].description}" />
      <span>  ${new Date(data.list[24].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })} </span>
    </div>
  </div>
  `;
};
apiFetch(url);
