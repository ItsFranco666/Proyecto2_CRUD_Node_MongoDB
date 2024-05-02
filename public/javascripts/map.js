var map = L.map('map').setView([4.601527132877571, -74.16330363964164], 20);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([4.601527132877571, -74.16330363964164]).addTo(map)
    .bindPopup('Este es el sitio.')
    .openPopup();
