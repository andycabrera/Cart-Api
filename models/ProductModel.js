var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'The name is required']
    },
    description: String,
    image: String,
    price:{
        type: Number,
        required: [true, 'The price is required']
    }
});

module.exports = mongoose.model('Product', productSchema);