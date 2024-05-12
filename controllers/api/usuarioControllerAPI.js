var Usuario = require('../../models/usuario');

usuarios_list = function(req, res){
    Usuario.find({}, function(err, usuario){
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

usuario_reservar = function(req, res){
    Usuario.findById(req.body.id, function(err, usuario){
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.hasta, function(err){
            console.log('Reserva !!!!');
            res.status(200).status;
        });
    });
};

usuarios_create = function(req, res){
    var usuario = new Usuario({nombre: req.body.nombre});

    usuario.save(function(err){
        res.status(200).json({usuario});
    });
};

module.exports = {
    usuarios_list,
    usuario_reservar,
    usuarios_create
};
