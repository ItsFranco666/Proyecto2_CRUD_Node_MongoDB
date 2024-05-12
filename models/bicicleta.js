/**
 * AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git
 */

const mongoose = require('mongoose');
const { Schema, model } = mongoose; // Destructure Schema and model for cleaner syntax

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    }
});

bicicletaSchema.methods.ToString = function(){
    return 'code: ' + this.code + ' | color: ' + this.color;
}

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
}

bicicletaSchema.statics.allBicis=function(cb){
    return this.find({},cb);
}

bicicletaSchema.statics.add = function(aBici, cb){ //le pasamos la bici y un callback
    this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb){ //le pasamos el codigo y un callback
    return this.findOne({code: aCode}, cb); //trae el primero uno, el primero que encuentro y le pasamos un json con la propieda code y el valor del parametro
};

bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);

/*
const bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }, // Indice geografico
    },
});

bicicletaSchema.methods.toString = function () { // Arrow function for cleaner syntax
    return `code: ${this.code} | color: ${this.color}`;
};

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code,
        color,
        modelo,
        ubicacion,
    });
};

bicicletaSchema.statics.allBicis = async function () { // Use async/await for promises
    try {
        const bicicletas = await this.find({});
        return bicicletas;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for proper handling
    }
};

bicicletaSchema.statics.add = async function (aBici) { // No need for callback, use async/await
    try {
        const nuevaBici = await this.create(aBici);
        return nuevaBici;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for proper handling
    }
};

bicicletaSchema.statics.findByCode = async function (aCode) { // Use async/await for promises
    try {
        const bicicleta = await this.findOne({ code: aCode });
        return bicicleta;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for proper handling
    }
};

bicicletaSchema.statics.removeByCode = async function (aCode) { // Use async/await for promises
    try {
        const deleted = await this.deleteOne({ code: aCode });
        return deleted.deletedCount; // Return the number of documents deleted
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for proper handling
    }
};

module.exports = model('Bicicleta', bicicletaSchema);
*/
