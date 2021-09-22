import L from 'leaflet';

export function addTileLayer(map) {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGF6YXJkMTBnbG9yIiwiYSI6ImNrdHVkdDkzZTA5emkyb21wZXM5cXo3MG4ifQ.5nKo6F0REZMqx4eM0V05Ig', {
        attribution: '<a href="https://www.openstreetmap.org/copyright"></a><a href="https://www.mapbox.com/"></a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);
}