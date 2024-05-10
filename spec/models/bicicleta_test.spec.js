/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */
var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");

describe("Testing Bicicletas", function() { //seteamos la conexion de la BD
    beforeEach(function(done) {
        var mongoDB = "mongodb://localhost:27017/red_bicicletas";
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function() {
            console.log("We are connected to test database");
            done();
            });
        });
});

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){ //Con el deleteMany borramos todo de la coleccion de bicis
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', ()=> {
        it("Crea una instancia de bicicleta", () => {
            var bici = new Bicicleta.createInstance(
                1,
                "verde",
                "urbana",
                [4.57953416933143, -74.15702058311012]
            );
            expect(bici.id).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.tipo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(4.57953416933143);
            expect(bici.ubicacion[1]).toEqual(-74.15702058311012);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it("Comienza vacia", (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0); //le pedimos siempre que la lista arranque vacia
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"}); //creamos una bici
            Bicicleta.add(aBici, function(error, newBici){ //la agregamos con add y le paso aBici
                if(error) console.log(error);
                Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toEqual(1);
                expect(bicis[0].code).toBe(aBici.code);

                done();
            });
        });
    });
 });

 describe('Bicicleta.findByCode', () => {
    it('Debe encontrar una bici con code 1', (done) =>
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);


            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, function(err, newBici){
                if(err) console.log(err);

                var aBici2 = new Bicicleta({code: 2, color: "roja", modelo: "urbana"});
                Bicicleta.add(aBici2, function(err, newBici){
                    if(err) console.log(err);

                    Bicicleta.findByCode(1, function(error, targetBici){
                        expect(targetBici.code).toBe(aBici.code);
                        expect(targetBici.color).toBe(aBici.color);
                        expect(targetBici.modelo).toBe(aBici.modelo);

                        done();
                    });
                });
            });
        })); //linea de error xd
    });


/**Vacia la lista de bicicletas antes de realizar cada test */
/*
beforeEach(() => {
  Bicicleta.allBicis = [];
});

/**Grupo de testing.
 * se va a revisar que la lista de bicicletas inicie vacia */
/*
describe("Bicicleta.allBicis", () => {
  /**Caso de prueba */
/*  it("Comienza vacia", () => {
    /**La lista deberia estar vacia */
    /*expect(Bicicleta.allBicis.length).toBe(0);
  });
});

/**Prueba para agregar una bicicleta */
/*describe("Bicicleta.add", () => {
  /**Caso de prueba */
  /*it("Se agrego una bicicleta", () => {
    /**La lista deberia estar vacia */
    /*expect(Bicicleta.allBicis.length).toBe(0);

    var a = new Bicicleta(
      1,
      "Rojo",
      "Urbana",
      [4.57953416933143, -74.15702058311012]
    );
    Bicicleta.add(a);

    /**Cuando se termine la prueba deberia haber una bicicleta */
    /*expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

/**Prueba para abuscar una bicicleta */
/*describe("Bicicleta.findById", () => {
  /**Caso de prueba */
  /*it("Debe devolver la bici con id 1", () => {
    /**La lista deberia estar vacia */
    /*expect(Bicicleta.allBicis.length).toBe(0);

    /**Crear 2 bicicletas para ser buscadas */
   /* var a = new Bicicleta(1, "Rojo", "Urbana");
    var b = new Bicicleta(2, "Azul", "Montaña");
    Bicicleta.add(a);
    Bicicleta.add(b);

    /**Evaluar que los datos de la bici encontrada sean los correspondientes
     * de la bici que se creo */
    /*var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(a.id);
    expect(targetBici.color).toBe(a.color);
    expect(targetBici.modelo).toBe(a.modelo);
  });
});

/**Prueba para abuscar una bicicleta */
/*describe("Bicicleta.removeById", () => {
  /**Caso de prueba */
  /*it("Debe eliminar la bici con id 1", () => {
    /**La lista deberia estar vacia */
    /*expect(Bicicleta.allBicis.length).toBe(0);

    /**Crear una bicicleta para ser buscada */
    /*var a = new Bicicleta(
      1,
      "Rojo",
      "Urbana",
      [4.57953416933143, -74.15702058311012]
    );
    Bicicleta.add(a);

    /**Evaluar que la lista este vacia (se elimino la bicicleta) */
    /*Bicicleta.removeById(a.id);

    expect(Bicicleta.allBicis.length).toBe(0);
  });
});
*/
