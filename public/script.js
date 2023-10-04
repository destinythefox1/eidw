let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.4281, lng: -6.2595},  // Coordinates for Dublin Airport (EIDW)
    zoom: 6
  });

  updateFlights();
  setInterval(updateFlights, 6000); // Update every minute
}

let markers = [];

async function updateFlights() {
  try {
    // Remove old markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    const res = await fetch('/flights');
    const flights = await res.json();
    flights.forEach(flight => {
      const [icao24, callsign, origin, timestamp, lat, long, altitude] = flight;
      const marker = new google.maps.Marker({
        position: {lat, lng: long},
        map,
        icon: '/img/plane.png'  // Use your own airplane icon
      });

      markers.push(marker);
    });
  } catch (error) {
    console.error('Could not fetch flight data', error);
  }
}

