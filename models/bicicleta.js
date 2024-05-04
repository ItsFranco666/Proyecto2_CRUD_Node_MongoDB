/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Clase Principal de Bicicletas */
var Bicicleta = function(id, color, modelo, ubicacion) { // Constructor principal
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
};

/**Funcion toString de la clase que retorna el id y el color del objeto*/
Bicicleta.prototype.toString = function() {
    return 'id: ' + this.id + ' | color: ' + this.color;
};

/**Lista de bicicletas */
Bicicleta.allBicis = [];

/**Metodo para añadir bicicletas a la lista */
Bicicleta.add = function(aBici) {
    Bicicleta.allBicis.push(aBici);
}

/**Metodo para buscar bicicletas por id */
Bicicleta.findById = function(aBiciId) {
    // Buscar en la coleccion
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if(aBici) {
        return aBici;
    } else { // Si no existe la bicicleta indicada retornara el error
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
    }
};

/**Metodo para remover una bicicleta */
Bicicleta.removeById = function(aBiciId) {
    // Itera sobre todo el array de bicicletas en busca del id especificado
    for(var i = 0; i < Bicicleta.allBicis.length; i++) {
        if(Bicicleta.allBicis[i].id == aBiciId) {
            /**Si se encuentra el registro en el array de bicicletas
             * se ua la funcion splice para quitar el elemento del array */
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
};

/**Module Exports */
module.exports = Bicicleta;
