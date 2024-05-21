const mongoose = require('mongoose');
const Reserva = require('./reserva'); // Assuming reservaModel.js is in the same directory
const { Schema, model } = mongoose; // Destructure Schema and model for cleaner syntax
/*usuarioSchema.methods.reservar = async function(biciId, desde, hasta){
	var reserva = new Reserva({
		usuario: this._id,
		bicicleta: biciId,
		desde: desde,
		hasta: hasta
	});
	console.log(reserva);
	try {
		await reserva.save();
	} catch (err) {
		console.error(err);
	}
};*/

var UsuarioSchema = new Schema({
	nombre: String,
});

UsuarioSchema.statics.allUsers = async function () { // Use async/await for promises
	try {
		const usuarios = await this.find({});
		return usuarios;
	} catch (error) {
		console.error("Hubo un error al listar los usuarios ", error);
		throw error; // Re-throw the error for proper handling
	}
};

UsuarioSchema.statics.add = async function (aUser) { // No need for callback, use async/await
	try {
		const nuevoUser = await this.create(aUser);
		return nuevoUser;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw the error for proper handling
	}
};

UsuarioSchema.statics.reservar = async function (usuario) {
	try {
		const reserva = await this.create(usuario);
		console.log(reserva);
		return reserva;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw the error for proper handling
	}
};

UsuarioSchema.methods.toString = function () {
	return `Nombre: ${this.nombre}`;
}

module.exports = mongoose.model('Usuario', UsuarioSchema);