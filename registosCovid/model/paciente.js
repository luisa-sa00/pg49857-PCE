var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RegistoModel = require('./registo');

var PacienteSchema = new Schema({
    id_paciente: {type: Number, unique: true},
    nome: {type: String},
    data_nascimento: {type: Date},
    genero: {type: String},
    cod_postal: {type: Number},
    registos: [RegistoModel.schema]
})

module.exports = mongoose.model('paciente', PacienteSchema)