var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");
var Reserva = require("../../models/reserva");

describe("Testing Usuarios", function () { //seteamos la conexion de la BD
	beforeEach(function (done) {
		var mongoDB = "mongodb://localhost:27017/red_bicicletas";
		mongoose.connect(mongoDB);

		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "connection error"));
		db.once("open", function () {
			console.log("We are connected to test database");
			done();
		});
	});

	// Al acabar el test se borran todas las bicicletas
	afterEach(function(done) {
		Reserva.deleteMany({}, function (err, res) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function (err, res) {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function (err, res) {
                    if (err) console.log(err);
                    done();
                });
            });
        });
	  });
	  

	// test para probar el modelo creando una instancia
	describe('Cuando un Usuario reserva una bici', () => {
		it('Debe existir la reserva', (done) => {
			const usuario = new Usuario({nombre: 'Ezequiel'});
            usuario.save();
            const Bicicleta = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'});
            Bicicleta.save();

            var hoy = new Date();
            var manana = new Date();
            manana.setDate(manana.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, manana, function(err, reserva){
                Reserva.findOne({}).populate('bicicleta').populate('usuario').exec(function(err,){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
		});
	});
});
