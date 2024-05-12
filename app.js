/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Dependencias de Modulos */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**Se indican o importan todas las rutas que contienen la logica de la aplicacion */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');

/**Creacion de la instancia express para usar la aplicacion */
var app = express();

/**Conexion a MONGODB mediante mongoose */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/red_bicicletas');
/**Mongoose utiliza promesas por defecto para operaciones asíncronas.
 * Esta línea asegura que las promesas utilizadas por Mongoose sean globales */
mongoose.Promise = global.Promise;

/**Gestionar eventos de error */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error de conexion:'));

/**Se indica la ruta de las vistas y el motor que se usara, en este caso se usa pug */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**Configuracion middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**Asignar los modulos de las rutas a cada URL con un controlador especifico  */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);

/**Captura cualquier solicitud entrante que no haya sido manejada por ninguna otra ruta y genera un error 404 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**Captura de errores */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la pagina de error
  res.status(err.status || 500);
  res.render('error');
});

/**Module Exports */
module.exports = app;
