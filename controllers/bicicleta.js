/**Importar el modelo de bicicleta */
var Bicicleta = require('../models/bicicleta');

/**Renderizar la vista index dentro de la carpeta de bicicletas en las vistas */
bicicleta_list = function (req, res) {
    /** Busca en las vistas el archivo index dentro de 'bicicletas'.
     * Luego manda al index la lista con las bicicletas que han sido añadidas */
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis}); // Se envia con el nombre de 'bicis'
};

bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici});
};
    
bicicleta_update_post = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas');
};

bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
};
    
bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
};

bicicleta_delete_post = function (req, res) {
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas');
};

module.exports = {
    bicicleta_list,
    bicicleta_update_get,
    bicicleta_update_post,
    bicicleta_create_get,
    bicicleta_create_post,
    bicicleta_delete_post
};
