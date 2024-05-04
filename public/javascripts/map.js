/**Creacion del objeto map de la API leaflet */
var map = L.map('map').setView([4.5791545, -74.1576904], 20);

/**Crea una capa de 'tiles' o pequeñas imagenes que hacen parte de un mapa interactivo y como parametros
 * recibe la URL de la capa de 'tiles' que se van a agrgar con los placeholders de las coordenadas.
 * Luego se agrega la capa de 'tiles' al objeto map */
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Informacion de atribucion indicando que los 'tiles' provienen de OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**Marcador ubicacion principal 
L.marker([4.601527132877571, -74.16330363964164]).addTo(map)
    .bindPopup('Este es el sitio.')
    .openPopup();
*/

// L.marker([4.601527132877571, -74.16330363964164]).addTo(map);
// L.marker([4.6016509324643895, -74.16317708698217]).addTo(map);
// L.marker([4.601415658877795, -74.16351236310007]).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result)
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})
