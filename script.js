async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const apiKey = "08cdef1b5d2043afbc5150506252309";
    const url =  https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
 

    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.error) {
        document.getElementById("weatherResult").innerText = "Location not found.";
      } else {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        document.getElementById("weatherResult").innerText =
          `🌍 Location: ${data.location.name}, ${data.location.country}\n🌡️ Temperature: ${temp}°C\n🌤️ Condition: ${condition}`;
      }
    } catch (error) {
      document.getElementById("weatherResult").innerText = "Error fetching weather data.";
    }
  }

  
