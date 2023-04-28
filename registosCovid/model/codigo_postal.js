var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CodigoPostalSchema = new Schema({
    cod_postal: {type: Number, unique: true},
    localidade: {type: String}
})

module.exports = mongoose.model('codigo_postal', CodigoPostalSchema)