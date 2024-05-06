/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

var Bicicleta = require('../../models/bicicleta');

/**Vacia la lista de bicicletas antes de realizar cada test */
beforeEach(() => {Bicicleta.allBicis = [];});

/**Grupo de testing.
 * se va a revisar que la lista de bicicletas inicie vacia */
describe('Bicicleta.allBicis', () => {
    /**Caso de prueba */
    it('Comienza vacia', () => {
        /**La lista deberia estar vacia */
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

/**Prueba para agregar una bicicleta */
describe('Bicicleta.add', () => {
    /**Caso de prueba */
    it('Se agrego una bicicleta', () => {
        /**La lista deberia estar vacia */
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'Rojo', 'Urbana', [4.57953416933143, -74.15702058311012]);
        Bicicleta.add(a);

        /**Cuando se termine la prueba deberia haber una bicicleta */
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

/**Prueba para abuscar una bicicleta */
describe('Bicicleta.findById', () => {
    /**Caso de prueba */
    it('Debe devolver la bici con id 1', () => {
        /**La lista deberia estar vacia */
        expect(Bicicleta.allBicis.length).toBe(0);

        /**Crear 2 bicicletas para ser buscadas */
        var a = new Bicicleta(1, 'Rojo', 'Urbana');
        var b = new Bicicleta(2, 'Azul', 'Montaña');
        Bicicleta.add(a);
        Bicicleta.add(b);

        /**Evaluar que los datos de la bici encontrada sean los correspondientes
         * de la bici que se creo */
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(a.id);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);        
    });
});

/**Prueba para abuscar una bicicleta */
describe('Bicicleta.removeById', () => {
    /**Caso de prueba */
    it('Debe eliminar la bici con id 1', () => {
        /**La lista deberia estar vacia */
        expect(Bicicleta.allBicis.length).toBe(0);

        /**Crear una bicicleta para ser buscada */
        var a = new Bicicleta(1, 'Rojo', 'Urbana', [4.57953416933143, -74.15702058311012]);
        Bicicleta.add(a);

        /**Evaluar que la lista este vacia (se elimino la bicicleta) */
        Bicicleta.removeById(a.id);

        expect(Bicicleta.allBicis.length).toBe(0);       
    });
});


