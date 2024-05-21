/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Importar el modelo de bicicleta */
var Bicicleta = require('../../models/bicicleta');

/**Lista de bicicletas */
async function bicicleta_list(req, res) {
    try {
        const bicicletas = await Bicicleta.allBicis();  // Await the promise from allBicis
        res.status(200).json({ bicicletas });  // Respond with retrieved bicycles
        console.log("todas las bicicletas: ", bicicletas);  // Log retrieved bicycles for debugging
    } catch (error) {
        console.error("Error retrieving bicicletas:", error);
        res.status(500).json({ error: "Error retrieving bicycles" }); // Handle error gracefully
    }
}

/**Crear registro de bicicleta */
async function bicicleta_create(req, res) {
    const body = {
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };
    var bici = new Bicicleta(body);

    Bicicleta.add(bici);
    console.log("nueva bicicleta creada ", bici)

    res.status(201).json({
        bicicleta: bici
    });
};

/**Actualizar registro de bicicleta */
async function bicicleta_update(req, res) {
    try {
        const { code, color, modelo, lat, lng } = req.body; // Destructure request body

        const nuevaBici = {
            code,
            color,
            modelo,
            ubicacion: [lat, lng] // Use spread operator for location array
        }

        if (!Bicicleta.updateByCode(nuevaBici)) {
            return res.status(404).json({ message: "Bicicleta no encontrada" });
        } else {
            res.status(200).json({ bicicleta: nuevaBici });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error actualizando bicicleta" });
    }
}

/**Eliminar registro de bicicleta */
async function bicicleta_delete(req, res) {
    try {
        Bicicleta.removeByCode(req.body.code);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error eliminando bicicleta" });
    }
};

/**Module Exports */
module.exports = {
    bicicleta_list,
    bicicleta_create,
    bicicleta_update,
    bicicleta_delete
}
