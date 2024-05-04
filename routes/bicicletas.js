/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Dependencias de Modulos */
var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta'); // Controlador de Bicicletas 

/**Cuando el usuario se diriga a la seccion de bibicletas en la pagina se redireccionara al indice de bicicletas.
 * Estan todas las rutas para realizar el CRUD */
router.get('/', bicicletaController.bicicleta_list);
router.get('/:id/update', bicicletaController.bicicleta_update_get);
router.post('/:id/update', bicicletaController.bicicleta_update_post);
router.get('/create', bicicletaController.bicicleta_create_get);
router.post('/create', bicicletaController.bicicleta_create_post);
router.post('/:id/delete', bicicletaController.bicicleta_delete_post);

/**Module Exports */
module.exports = router;
