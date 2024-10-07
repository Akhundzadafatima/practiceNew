const searchBtn = document.getElementById("searchBtn");
const konum = document.getElementById("konum");
const select = document.getElementById("select");

searchBtn.addEventListener("click", async () => {
    const city = select.value.trim(); // Axtarışdan alınan şəhər adı
    konum.innerHTML = ""; // Əvvəlki məlumatları təmizləmək üçün

    if (!city) {
        konum.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const apiKey = "pk.6071c5c3a9cb08816a0322571ed3bb53"; // LocationIQ API açarı
    try {
        // Yerini tapmaq üçün API çağırışı
        const locationApiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${city}&format=json`;
        const locationResponse = await fetch(locationApiUrl);
        const locationData = await locationResponse.json();

        if (locationData.length === 0) {
            konum.innerHTML = `<p>No results found for "${city}".</p>`;
            return;
        }

        const location = locationData[0];

        // Hava məlumatlarını almaq üçün API çağırışı
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max`;
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        // Məlumatların DOM-a əlavə edilməsi
        konum.innerHTML += `<p><strong>City:</strong> ${city}</p>
                            <p><strong>Name:</strong> ${location.display_name}</p>
                            <p><strong>Lat:</strong> ${location.lat}</p>
                            <p><strong>Lon:</strong> ${location.lon}</p>
                            <p><strong>Max Temp:</strong> ${weatherData.daily.temperature_2m_max[0]}°C</p>
                            <hr>`;
    } catch (error) {
        konum.innerHTML = `<p>Error fetching data for ${city}: ${error.message}</p>`;
    }
});
