/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");

describe("Testing Bicicletas", function () { //seteamos la conexion de la BD
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
	afterEach(async () => {
		try {
		  await Bicicleta.deleteMany({}); // Use async/await with deleteMany
		} catch (error) {
		  console.error(error); // Handle errors using try/catch
		}
	  });
	  

	// test para probar el modelo creando una instancia
	describe('Bicicleta.createInstance', () => {
		it('Crea una instancia de bicicleta', () => {
			const bici = new Bicicleta({
				code: 1,
				color: 'verde',
				modelo: 'urbana',
				ubicacion: [4.57953416933143, -74.15702058311012],
			});

			expect(bici.code).toBe(1);
			expect(bici.color).toBe('verde');
			expect(bici.modelo).toBe('urbana');
			expect(bici.ubicacion[0]).toEqual(4.57953416933143);
			expect(bici.ubicacion[1]).toEqual(-74.15702058311012);
		});
	});


	describe('Bicicleta.allBicis', () => {
		it('Comienza vacia', async () => {
		  const bicicletas = await Bicicleta.allBicis(); // Esperamos a que se complete la función
		  expect(bicicletas.length).toBe(0); // Verificamos que la lista esté vacía
		});
	  });
	  

	describe('Bicicleta.add', () => {
		it('Agrega solo una bici', async () => {
			const aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });

			await Bicicleta.add(aBici);

			const bicis = await Bicicleta.allBicis();
			expect(bicis.length).toEqual(1);
			expect(bicis[0].code).toBe(aBici.code);
		});
	});

	describe('Bicicleta.findByCode', () => {
		it('Debe encontrar una bici con code 1', async () => {
			// Crear y agregar dos bicicletas
			const aBici1 = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
			const aBici2 = new Bicicleta({ code: 2, color: 'roja', modelo: 'urbana' });
			await Bicicleta.add(aBici1);
			await Bicicleta.add(aBici2);

			// Buscar la bicicleta con código 1
			const targetBici = await Bicicleta.findByCode(1);
			expect(targetBici.code).toBe(aBici1.code);
			expect(targetBici.color).toBe(aBici1.color);
			expect(targetBici.modelo).toBe(aBici1.modelo);
		});
	});

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
