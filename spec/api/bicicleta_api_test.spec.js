/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var mongoose = require('mongoose');

/**Cuando se llama al servidor se ejecuta todo lo que contiene adentro.
 * Por lo tanto se va a iniciar el servidor durante las pruebas y cuando
 * se acaben se muere el proceso del servidor */
var server = require('../../bin/www');
var base_url = "http://localhost:5000/api/bicicletas";

describe("Bicicleta API", () => {
    beforeEach(function (done) {
        var mongoDB = 'mongodb://localhost:27017/testdb';
        mongoose.connect(mongoDB);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', function () {
            console.log('We are connected to test database');
            done();
        });


    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('GET BICICLETAS /', () => {
        it('Status 200', (done) => {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(body).bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST BICLETAS /', () => {
        it("Status 200", (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "code": 10, "color": "roja", "modelo": "urbana", "lat": -34", "lng": -54 };';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it("Status 204", (done) => {
            var a = Bicicleta.createInstance(1, 'negro', 'urbana', [-34, -54]);
            Bicicleta.add(a, function(err, newBici){
                var headers = {'Content-Type': 'application/json'};
                var aBici = {"id": 1};
            });
        });
    });


});
