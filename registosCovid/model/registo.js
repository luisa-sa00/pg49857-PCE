var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistoSchema = new Schema({
    num_seq: {type: Number},
    data_registo: {type: String},
    temperatura: {type: Number},
    falta_ar: {type: String},
    dor_cabeca: {type: String},
    dor_muscular: {type: String},
    tosse: {type: String},
    diarreia: {type: String},
    olfato_paladar: {type: String},
    avaliacao_global: {type: String}
})

module.exports = mongoose.model('registo', RegistoSchema)