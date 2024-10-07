const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  const item = document.createElement("li");
  const apiUrl =
    "https://us1.locationiq.com/v1/search.php?key=pk.6071c5c3a9cb08816a0322571ed3bb53&q=baku&format=json";
  let location;
  await fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const konum = document.getElementById("konum");
      location = data[0];

      data.forEach((location) => {
        konum.innerHTML += `<p><strong>Name:</strong> ${location.display_name}</p> <p><strong>Lat:</strong> ${location.lat}</p><p><strong>Lon:</strong> ${location.lon}</p>`;
        // konum.innerHTML += `<p><strong>Lat:</strong> ${location.lat}</p>`;
        // konum.innerHTML += `<p><strong>Lon:</strong> ${location.lon}</p>`;
      });
    })
    .catch((error) => {
      konum.textContent = "Error: " + error.message;
    });
  // https://api.open-meteo.com/v1/forecast?latitude=42.6568455&longitude=23.3494954&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max

  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max`
  )
    .then((res) => res.json())
    .then((res) => console.log(res));

  konum.append(data);
});
