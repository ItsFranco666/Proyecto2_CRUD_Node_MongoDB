/**Clase Principal de Bicicletas */
var Bicicleta = function(id, color, modelo, ubicacion) {
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
    } else {
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
    }
};

/**Metodo para remover una bicicleta */
Bicicleta.removeById = function(aBiciId) {
    for(var i = 0; i < Bicicleta.allBicis.length; i++) {
        if(Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
};

module.exports = Bicicleta;
