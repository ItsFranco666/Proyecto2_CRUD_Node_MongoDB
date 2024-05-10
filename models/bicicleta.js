/**AUTOR:
 * Nombre: Andres Felipe Franco Tellez
 * Codigo: 20221978031
 * Repositorio: https://github.com/ItsFranco666/Proyecto2_CRUD_Node_MongoDB.git */

/**Clase Principal de Bicicletas */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
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
*/
module.exports = router;