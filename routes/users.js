/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Dependencias de Modulos */
var express = require('express');
var router = express.Router();

/* Ruta para listado de usuarios */
router.get('/', function(req, res, next) {
  res.send('Responder con un recurso');
});

/**Module Exports */
module.exports = router;
