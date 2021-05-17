var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var addressSchema = new Schema({
    street: {
        type: String,
        trim: true
    },
    number:{
        type: String,
        trim: true
    },
    neighborhood:{
        type: String,
        trim: true
    },
    postalCode:{
        type: String,
        trim: true
    },
    flat:{
        type: String,
        trim: true
    },
    detail: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Address', addressSchema);