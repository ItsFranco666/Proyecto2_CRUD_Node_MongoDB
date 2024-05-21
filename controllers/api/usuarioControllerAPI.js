var Usuario = require('../../models/usuario');

async function usuarios_list(req, res) {
    try {
        const usuarios = await Usuario.allUsers();  // Await the promise from allBicis
        res.status(200).json({ usuarios });  // Respond with retrieved bicycles
        console.log("todas los usuarios: ", usuarios);  // Log retrieved bicycles for debugging
    } catch (error) {
        console.error("Error retrieving usuarios:", error);
        res.status(500).json({ error: "Error retrieving usuarios" }); // Handle error gracefully
    }
};

async function usuario_reservar(req, res) {
    try {
        console.log(req.body.id)
      const usuario = await Usuario.findById(req.body.id); // Find user with promise
      
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      const usuario_reservar = new Usuario({id: req.body.id, bici_id: req.body.bici_id, desde: req.body.desde, hasta: req.body.hasta});

      Usuario.reservar(usuario_reservar);

      console.log('Reserva realizada!', usuario_reservar); // Log after successful reservation
      res.status(200).json({ message: "Reserva realizada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error realizando la reserva" });
    }
  }
  

async function usuarios_create(req, res) {
    var usuario = new Usuario({ nombre: req.body.nombre });

    Usuario.add(usuario);

    console.log("nuevo usuario creado ", usuario)

    res.status(201).json({
        Usuario: usuario
    });
};

module.exports = {
    usuarios_list,
    usuario_reservar,
    usuarios_create
};
