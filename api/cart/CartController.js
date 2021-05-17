const Cart = require("../../models/CartModel");
const CartService = require("./CartService");

module.exports = {
  getHealth: (req, res) => {
    return res.status(200).json("ok");
  },
  getCart: async (req, res) => {
    return await CartService.getCart(req.params.id, res);
  },
  createCart: async (req, res) => {
    return await CartService.createCart(req,res);
  },
  emptyCart: async (req, res) => {
    return await CartService.emptyCart(req.params.id, res);
  },
  addProduct: async (req, res) => {
    const product = {
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity ? req.body.quantity : 1,
    };

    return await CartService.addProduct(req.params.id, product, res);
  },
  removeProduct: async (req, res) => {
    return await CartService.removeProduct(
      req.params.id,
      req.params.product,
      res
    );
  },
  updateProduct: async (req, res) => {
    return await CartService.updateProduct(
      req.params.id,
      req.params.product,
      req.body.quantity,
      res
    );
  },
  addAddress: async (req, res) => {
    const address = {
      street: req.body.street,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      postalCode: req.body.postalCode,
      flat: req.body.flat,
    };

    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contact: req.body.contact,
      comment: req.body.comment,
    };

    return await CartService.addAddress(req.params.id, address, customer, res);
  },
  addUser: async (req, res) => {
    return await CartService.addUser(req.params.id, req.body.seller, res);
  },
  deleteCart: async (req, res) => {
    await Cart.deleteOne({ _id: req.params.id }, (err, cart) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: `The Cart ${cart._id} was deleted` });
    });
  },
};
