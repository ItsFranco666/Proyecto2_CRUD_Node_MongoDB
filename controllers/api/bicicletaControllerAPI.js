/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Importar el modelo de bicicleta */
var Bicicleta = require('../../models/bicicleta');

/**Lista de bicicletas */
bicicleta_list = function (req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
};

/**Crear registro de bicicleta */
bicicleta_create = function (req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
};

/**Actualizar registro de bicicleta */
bicicleta_update = function (req, res) {
    var bici = Bicicleta.findById(req.body.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.status(200).json({
        bicicleta: bici
    });
};

/**Eliminar registro de bicicleta */
bicicleta_delete = function (req, res) {
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
};

/**Module Exports */
module.exports = {
    bicicleta_list,
    bicicleta_create,
    bicicleta_update,
    bicicleta_delete
}
