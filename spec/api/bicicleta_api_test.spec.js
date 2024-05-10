/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

var Bicicleta = require('../../models/bicicleta');
var request = require('request');
/**Cuando se llama al servidor se ejecuta todo lo que contiene adentro.
 * Por lo tanto se va a iniciar el servidor durante las pruebas y cuando
 * se acaben se muere el proceso del servidor */
var server = require('../../bin/www');

var base_url = "http://localhost:5000/api/bicicletas";

//beforeEach(() => {Bicicleta.allBicis = [];});

describe ("Bicicleta API", () => {
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', function() {
            console.log('We are connected to test database');
            done();
        });


    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });



})

/**Tests para la API */
describe('Bicicletas API', () => {
    /**Probar metodo GET */
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            /**Lista vacia */
            expect(Bicicleta.allBicis.length).toBe(0);

            /**Crear bicicleta */
            var a = new Bicicleta(1, 'Rojo', 'Urbana', [4.57953416933143, -74.15702058311012]);
            Bicicleta.add(a);

            /**Ejecutar un GET */
            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    /**Probar metodo POST */
    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => { // como parametro se pasa un callback que se ejecutara al final
            var headers = {'Content-Type': 'application/json'};
            var aBici = {"id": 10, "color": "Rojo", "modelo": "Urbano", "lat": 4.57953416933143, "lng": -74.15702058311012};
            request.post({
                url: 'http://localhost:3000/api/bicicletas/create',
                headers: headers,
                body: JSON.stringify(aBici) //aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('Rojo');
                /**Puede ocurrir que al ejecutar el metodo se termine el test sin haber recibido una respuesta
                 * por parte de la peticion, por eso se llama al callback 'done()' como parametro. Hasta que
                 * no se ejecute el 'done()' no se finaliza el test. */
                done();
            }
        );
        });
    });

    /**Probar metodo PUT */
    describe('PUT BICICLETAS /update', () => {
        it('Status 200', (done) => { // como parametro se pasa un callback que se ejecutara al final
            /**Crear nueva bicicleta para el test */
            var a = new Bicicleta(1, 'Rojo', 'Urbana', [4.57953416933143, -74.15702058311012]);
            Bicicleta.add(a);

            /**Contenido del metodo */
            var headers = {'Content-Type': 'application/json'};
            var aBici = {"id": 1, "color": "Azul", "modelo": "Montaña", "lat": 4.57953416933143, "lng": -74.15702058311012};
            request.put({
                url: 'http://localhost:3000/api/bicicletas/update',
                headers: headers,
                body: JSON.stringify(aBici) //aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe('Azul'); // Se debe actualizar el color a azul
                /**Puede ocurrir que al ejecutar el metodo se termine el test sin haber recibido una respuesta
                 * por parte de la peticion, por eso se llama al callback 'done()' como parametro. Hasta que
                 * no se ejecute el 'done()' no se finaliza el test. */
                done();
            }
        );
        });
    });

    /**Probar metodo DELTE */
    describe('DELETE BICICLETAS /delete', () => {
        it('Status 204', (done) => { // como parametro se pasa un callback que se ejecutara al final
            /**Crear nueva bicicleta para el test */
            var a = new Bicicleta(1, 'Rojo', 'Urbana', [4.57953416933143, -74.15702058311012]);
            Bicicleta.add(a);

            /**Contenido del metodo */
            var headers = {'Content-Type': 'application/json'};
            var aBici = {"id": 1};
            request.delete({
                url: 'http://localhost:3000/api/bicicletas/delete',
                headers: headers,
                body: JSON.stringify(aBici) //aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(0);
                /**Puede ocurrir que al ejecutar el metodo se termine el test sin haber recibido una respuesta
                 * por parte de la peticion, por eso se llama al callback 'done()' como parametro. Hasta que
                 * no se ejecute el 'done()' no se finaliza el test. */
                done();
            }
        );
        });
    });
});
