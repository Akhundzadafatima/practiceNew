const searchBtn = document.getElementById("searchBtn");
const select = document.getElementById("select");
const rightContainer = document.getElementById("rightContainer");
const modalLeft = document.getElementById("modalLeft");
const temperatureLabel = document.getElementById("temperatureLabel");

searchBtn.addEventListener("click", () => {
  const city = select.value.trim();

  if (!city) {
    return;
  }

  fetchLocation(city).then((location) => {
    if (!location) return;

    fetchWeather(location).then((weather) => {
      if (!weather) return;
      modall(location, weather);
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
    return null;
  }
}

async function fetchWeather(location) {
  const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,precipitation_sum,weathercode`;

  try {
    const response = await fetch(weatherApi);
    return await response.json();
  } catch (error) {
    return null;
  }
}

function modall(location, weather) {
  const maxTemp = weather.daily.temperature_2m_max[0];
  const weatherTempp = weather.daily.weathercode[0];

  const weatherSec = getWeatherClass(weatherTempp);
  modalLeft.className = "modal-left " + weatherSec;

  temperatureLabel.textContent = `${maxTemp}°C`;
  rightContainer.innerHTML = `
        <p><strong>Şəhər:</strong> ${location.display_name}</p>
        <p><strong>Lat:</strong> ${location.lat}</p>
        <p><strong>Lon:</strong> ${location.lon}</p>
        <p><strong>Ən yüksək temperatur:</strong> ${maxTemp}°C</p>

    `;
}

function getWeatherClass(weatherTempp) {
  if (weatherTempp >= 0 && weatherTempp <= 20) return "clear";
  if (weatherTempp >= 21 && weatherTempp <= 30) return "fog";
  if (weatherTempp >= 31 && weatherTempp <= 50) return "cloud";
  if (weatherTempp >= 51 && weatherTempp <= 60) return "rain";
  if (weatherTempp >= 61 && weatherTempp <= 100) return "snow";
}
