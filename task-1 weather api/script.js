// script.js

document.getElementById("weatherForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const apiKey = "989d2e86988d87dfecb28a8f5ddb1b6d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = `<div class="loading">🔄 Fetching weather data...</div>`;
  resultDiv.classList.remove("fade-in");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("❌ City not found or API limit exceeded");

    const data = await response.json();

    const weather = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    const output = `
      <div class="weather-content">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${weather.description}" class="weather-icon" />
        <p><strong>🌤 Weather:</strong> ${weather.main} (${weather.description})</p>
        <p><strong>🌡 Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>💨 Wind Speed:</strong> ${data.wind.speed} m/s</p>
      </div>
    `;

    resultDiv.innerHTML = output;
    resultDiv.classList.add("fade-in");
  } catch (error) {
    resultDiv.innerHTML = `<p class="error-msg">${error.message}</p>`;
  }
});
