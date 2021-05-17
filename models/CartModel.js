var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  customer: {
    firstName: String,
    lastName: String,
    contact: String,
    comment: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  addressPrice: {
    type: Number,
    default: 0,
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    flat: {
      type: String,
      trim: true,
    },
  },
  products: [
    {
      _id: String,
      name: {
        type: String,
        trim: true,
      },
      description: String,
      image: String,
      price: {
        type: Number,
      },
      quantity: {
        default: 1,
        type: Number,
      },
    },
  ],
  details: String,
  seller: String
});

module.exports = mongoose.model("Cart", cartSchema);
