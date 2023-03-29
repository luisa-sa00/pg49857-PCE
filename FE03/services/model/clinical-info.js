var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BloodPressSchema = new Schema({
    systolic: {type: Number},
    diastolic: {type: Number}
})
var ClinicalInfoSchema = new Schema({
    clinicalInfoID: {type: String, unique: true, require: true},
    admDate: {type: Date},
    bed: {type: String},
    bodyTemp: {type: Number},
    bloodPress: BloodPressSchema,
    bpm: {type: Number},
    sato2: {type: Number},
    timestamp: {type: Date}
})

module.exports = mongoose.model('clinical-info', ClinicalInfoSchema)