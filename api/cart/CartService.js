const Cart = require("../../models/CartModel");

exports.createCart = (req,res) => {
    Cart.create({}, (err, cart) => {
        if (err) return res.status(500).json(err);
        cart.seller = req.body.seller ? req.body.seller : null;
        cart.save();
        res.status(200).json(cart);
    });
};

exports.getCart = (id, res) => {
    Cart.findById(id, function (err, cart) {
        if (err) return res.status(500).json(err);
        if (!cart) return res.status(500).json({ message: "Cart not found" });
        res.status(200).json(cart);
    });
};

exports.emptyCart = (id, res) => {
    Cart.findById(id, function (err, cart) {
        if (err) return res.status(500).json(err);
        if (!cart) return res.status(500).json({ message: "Cart not found" });

        cart.products = [];
        cart.price = 0;
        cart.save((errCart, cartUp) => {
            if (errCart) return res.status(500).json(errCart);
            return res.status(200).json(cartUp);
        });
    });
};

exports.addProduct = (id, product, res) => {
    Cart.findById(id, (err, cart) => {
        if (err) return res.status(500).json(err);

        if(cart.products.some((item) => item.id == product._id)){
            cart.products.map((item) => {
                if (item.id == product._id) {
                    return updateProduct(id, product._id, Number(item.quantity) + 1, res);
                }
            });
        }else{
            cart.products.push(product);
            cart.price = Number(cart.price) + Number(product.price) * Number(product.quantity);
            
            cart.save((errCart, cartUp) => {
                if (errCart) return res.status(500).json(errCart);
                return res.status(200).json(cartUp);
            });
        }
       
    });
};

exports.updateProduct = (id, productId, quantity, res) => {
    return updateProduct(id, productId, quantity, res);
};

exports.removeProduct = async (id, productId, res) => {
    Cart.findById(id, (err, cart) => {
        if (err) return res.status(500).json(err);

        const index = cart.products.findIndex(
            (product) => product._id === productId
        );
        console.log(cart.products);
        if (index !== undefined) {
            cart.products.splice(index, 1);

            cart.price = 0;
            cart.products.map((product) => {
                cart.price =
                    Number(cart.price) + Number(product.price) * Number(product.quantity);
            });

            cart.save((errCart, cartUp) => {
                if (errCart) return res.status(500).json(errCart);
                res.status(200).json(cart);
            });
        } else {
            res.status(500).json({ message: "Product not found" });
        }
    });
};

exports.addAddress = (id,address, customer, res) => {
    Cart.findById(id, (err, cart) => {
        if(err) return res.status(500).json(err)

        cart.customer = customer === undefined ? null : customer
        cart.address = address
        cart.addressPrice = Number(100)
        cart.save((errCart, cartUp) => {
            if(errCart) return res.status(500).json(errCart)
            res.status(200).json(cart)
        })

    })
};

exports.addUser = (id,seller, res) => {
    Cart.findById(id, (err, cart) => {
        if(err) return res.status(500).json(err)
        console.log(seller)
        cart.seller = seller
        cart.save((errCart, cartUp) => {
            if(errCart) return res.status(500).json(errCart)
            res.status(200).json(cartUp)
        })

    })
};


const updateProduct = (id, productId, quantity, res) => {
    Cart.findById(id, (err, cart) => {
        if (err) return res.status(500).json(err);

        cart.price = 0;
        cart.products.map((product) => {
            if (product._id === productId) {
                product.quantity = quantity;
                cart.price =
                    Number(cart.price) + Number(product.price) * Number(product.quantity);
            } else {
                cart.price =
                    Number(cart.price) + Number(product.price) * Number(product.quantity);
            }
        });

        cart.save((errCart, cartUp) => {
            if (errCart) return res.status(500).json(errCart);
            res.status(200).json(cart);
        });
    });
};
