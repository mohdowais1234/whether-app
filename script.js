
async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!location) {
    result.innerHTML = `
      <div class="message">Please enter a city name!</div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="message">⏳ Loading weather...</div>
  `;

  // Add your WeatherAPI key here
  const apiKey =  "08cdef1b5d2043afbc5150506252309";

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Location not found");
    }

    const current = data.current;
    const city = data.location;

    result.innerHTML = `
      <div class="weather-info">

        <h2 class="city">📍 ${city.name}</h2>
        <p class="country">${city.region}, ${city.country}</p>

        <img
          class="weather-icon"
          src="https:${current.condition.icon}"
          alt="${current.condition.text}"
        >

        <h1 class="temperature">
          ${Math.round(current.temp_c)}°C
        </h1>

        <p class="condition">
          ${current.condition.text}
        </p>

        <div class="weather-details">

          <div class="detail-card">
            <span>🌡️</span>
            <p>Feels Like</p>
            <h3>${current.feelslike_c}°C</h3>
          </div>

          <div class="detail-card">
            <span>💧</span>
            <p>Humidity</p>
            <h3>${current.humidity}%</h3>
          </div>

          <div class="detail-card">
            <span>💨</span>
            <p>Wind Speed</p>
            <h3>${current.wind_kph} km/h</h3>
          </div>

          <div class="detail-card">
            <span>☀️</span>
            <p>UV Index</p>
            <h3>${current.uv}</h3>
          </div>

        </div>
      </div>
    `;

  } catch (error) {
    result.innerHTML = `
      <div class="message">
        ❌ ${error.message}
        <p>Please try another city.</p>
      </div>
    `;
  }
}

// Search using Enter key
document.getElementById("locationInput")
  .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });
