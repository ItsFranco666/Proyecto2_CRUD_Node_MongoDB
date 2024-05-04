/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Creacion del objeto map de la API leaflet */
var map = L.map('map').setView([4.5791545, -74.1576904], 20);

/**Crea una capa de 'tiles' o pequeñas imagenes que hacen parte de un mapa interactivo y como parametros
 * recibe la URL de la capa de 'tiles' que se van a agrgar con los placeholders de las coordenadas.
 * Luego se agrega la capa de 'tiles' al objeto map */
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Informacion de atribucion indicando que los 'tiles' provienen de OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**Marcadores Universidad
L.marker([4.5791545, -74.1576904]).addTo(map)
    .bindPopup('Universidad Distrital FJC')
    .openPopup();

L.marker([4.57953416933143, -74.15702058311012]).addTo(map);
L.marker([4.578689447444823, -74.15654551046767]).addTo(map);
L.marker([4.577750866397895, -74.15608755756976]).addTo(map);
L.marker([4.580327695057953, -74.15786801000688]).addTo(map);
L.marker([4.580327695057953, -74.15786801000688]).addTo(map);
L.marker([4.580664729905838, -74.15592492009986]).addTo(map);
*/

/**Solicitud AJAX para obtener datos JSON desde URL:'api/bicicletas'.
 * Si la solicitud es extiosa se iterara sobre el arreglo de bicicletas.
 * A cada bicicleta se le asignara una etiqueta con su numero y se manda al JSON */
$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result)
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: 'Bicicleta #' + bici.id}).addTo(map);
        });
    }
});
