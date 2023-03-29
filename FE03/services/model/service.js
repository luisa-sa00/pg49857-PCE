var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    serviceID: {type: Number, unique: true},
    serviceDesc: {type: String}
})

module.exports = mongoose.model('sensor', ServiceSchema)