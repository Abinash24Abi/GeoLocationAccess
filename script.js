const OFFICE_LOCATION = {
  latitude: 12.903817625939539, 
  longitude:79.31257083372397
};

const OFFICE_RADIUS = 500; // meters

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth radius in meters
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = 
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

document.getElementById("markBtn").addEventListener("click", () => {
  const resultEl = document.getElementById("result");
  resultEl.textContent = "Checking your location...";

  if (!navigator.geolocation) {
    resultEl.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const distance = getDistance(
        coords.latitude,
        coords.longitude,
        OFFICE_LOCATION.latitude,
        OFFICE_LOCATION.longitude
      );

      if (distance <= OFFICE_RADIUS) {
        resultEl.textContent = `✅ Attendance marked successfully!\nYou are within ${distance.toFixed(2)} meters.`;
        // Here, send the data to your backend using fetch/AJAX if needed
      } else {
        resultEl.textContent = `❌ You are outside school premises.\nDistance: ${distance.toFixed(2)} meters.`;
      }
    },
    (error) => {
      resultEl.textContent = "❌ Location access denied. Please enable GPS.";
    }
  );
});
