/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Dependencias de Modulos */
var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletaControllerAPI'); // Controlador de la API

/**Rutas para el CRUD utilizando la API*/
router.get('/', bicicletaController.bicicleta_list);
router.post('/create', bicicletaController.bicicleta_create);
router.put('/update', bicicletaController.bicicleta_update);
router.delete('/delete', bicicletaController.bicicleta_delete);

/**Module Exports */
module.exports = router;
