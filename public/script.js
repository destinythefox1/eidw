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
      let opacity = 1;

      // If the flight is not heading for Dublin, set opacity to 0.5
      if (origin !== 'EIDW') {
        opacity = 0.5;
      }

      const marker = new google.maps.Marker({
        position: {lat, lng: long},
        map,
        icon: {
          url: '/img/plane.png',
          scaledSize: new google.maps.Size(32, 32), // Size of the icon
          anchor: new google.maps.Point(16, 16), // Anchor point of the icon
        },
        opacity: opacity
      });

      markers.push(marker);
    });
  } catch (error) {
    console.error('Could not fetch flight data', error);
  }
}



