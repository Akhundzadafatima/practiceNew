const searchBtn = document.getElementById("searchBtn");
const select = document.getElementById("select");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalLeft = document.getElementById("modalLeft");
const temperatureLabel = document.getElementById("temperatureLabel");

searchBtn.addEventListener("click", () => {
  const city = select.value.trim();

  if (!city) {
    modal.innerHTML = "<p>Şəhər adı yazın.</p>";
    return;
  }

  fetchLocation(city).then((location) => {
    if (!location) return;

    fetchWeather(location).then((weather) => {
      if (!weather) return;
      updateModal(location, weather);
    });
  });
});

async function fetchLocation(city) {
  const key = "pk.6071c5c3a9cb08816a0322571ed3bb53";
  const locationApi = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  try {
    const response = await fetch(locationApi);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    konum.innerHTML = `<p>Hata: ${error.message}</p>`;
    return null;
  }
}

async function fetchWeather(location) {
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,precipitation_sum,weathercode`;

  try {
    const response = await fetch(weatherApiUrl);
    return await response.json();
  } catch (error) {
    modal.innerHTML = `<p>Hava məlumati alınamadı: ${error.message}</p>`;
    return null;
  }
}


function updateModal(location, weather) {
  const maxTemp = weather.daily.temperature_2m_max[0];
  const precipitation = weather.daily.precipitation_sum[0];
  const weatherTempp = weather.daily.weathercode[0];

  const weatherClass = getWeatherClass(weatherTempp);
  modalLeft.className = "modal-left " + weatherClass;

  temperatureLabel.textContent = `${maxTemp}°C`;
  modalBody.innerHTML = `
        <p><strong>Şəhər:</strong> ${location.display_name}</p>
        <p><strong>Lat:</strong> ${location.lat}</p>
        <p><strong>Lon:</strong> ${location.lon}</p>
        <p><strong>Max Sıcaklık:</strong> ${maxTemp}°C</p>
        <p><strong>Yağış:</strong> ${precipitation}mm</p>
    `;

  modal.style.display = "block"; 
}

function getWeatherClass(weatherTempp) {
  if (weatherTempp === 0) return "weather-clear";
  if (weatherTempp >= 1 && weatherTempp <= 3) return "weather-partly-cloudy";
  if 
    (weatherTempp >= 51 && weatherTempp <= 53) 
    return "weather-rain";
  if (weatherTempp >= 71 && weatherTempp <= 77) return "weather-snow";
  if (weatherTempp >= 45 && weatherTempp <= 48) return "weather-fog";
}