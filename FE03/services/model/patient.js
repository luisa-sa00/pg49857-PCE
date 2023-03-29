var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    patientID: {type: Number, unique: true},
    patientName: {type: String},
    patientBirthdate: {type: Date},
    patientAge: {type: Numebr}
})

module.exports = mongoose.model('sensor', PatientSchema)