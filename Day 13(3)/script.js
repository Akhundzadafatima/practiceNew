const searchBtn = document.getElementById("searchBtn");
const konum = document.getElementById("konum");
const select = document.getElementById("select");
const modal = document.getElementById("weatherModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementsByClassName("close")[0];
const modalLeft = document.getElementById("modalLeft");
const temperatureLabel = document.getElementById("temperatureLabel");

// Şehir ismi ile hava durumunu al
searchBtn.addEventListener("click", () => {
  const city = select.value.trim();
  konum.innerHTML = "";

  if (!city) {
    konum.innerHTML = "<p>Lütfen bir şehir adı girin.</p>";
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

// Konumu almak ucun API cagirmaq
async function fetchLocation(city) {
  const apiKey = "pk.6071c5c3a9cb08816a0322571ed3bb53";
  const locationApiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${city}&format=json`;

  try {
    const response = await fetch(locationApiUrl);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    konum.innerHTML = `<p>Hata: ${error.message}</p>`;
    return null;
  }
}

// Hava durumunu almaq ucun API çağrısı
async function fetchWeather(location) {
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,precipitation_sum,weathercode`;

  try {
    const response = await fetch(weatherApiUrl);
    return await response.json();
  } catch (error) {
    konum.innerHTML = `<p>Hava durumu alınamadı: ${error.message}</p>`;
    return null;
  }
}

// Modal'ı güncellek
function updateModal(location, weather) {
  const maxTemp = weather.daily.temperature_2m_max[0];
  const precipitation = weather.daily.precipitation_sum[0];
  const weatherCode = weather.daily.weathercode[0];

  const weatherClass = getWeatherClass(weatherCode);
  modalLeft.className = "modal-left " + weatherClass;

  temperatureLabel.textContent = `${maxTemp}°C`;
  modalBody.innerHTML = `
        <p><strong>Şehir:</strong> ${location.display_name}</p>
        <p><strong>Lat:</strong> ${location.lat}</p>
        <p><strong>Lon:</strong> ${location.lon}</p>
        <p><strong>Max Sıcaklık:</strong> ${maxTemp}°C</p>
        <p><strong>Yağış:</strong> ${precipitation}mm</p>
    `;

  modal.style.display = "block"; // Modali aç
}

// Hava durumu koduna göre backgroundu ayarlamaq
function getWeatherClass(weatherCode) {
  if (weatherCode === 0) return "weather-clear";
  if (weatherCode >= 1 && weatherCode <= 3) return "weather-partly-cloudy";
  if (
    (weatherCode >= 51 && weatherCode <= 53) ||
    (weatherCode >= 61 && weatherCode <= 67)
  )
    return "weather-rain";
  if (weatherCode >= 71 && weatherCode <= 77) return "weather-snow";
  if (weatherCode >= 45 && weatherCode <= 48) return "weather-fog";
}
