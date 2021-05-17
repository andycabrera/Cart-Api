var express = require('express');
var router = express.Router();
var cartController = require('../../api/cart/CartController')

router.get('/health', cartController.getHealth);
router.get('/:id', cartController.getCart);
router.post('/', cartController.createCart);
router.post('/empty/:id', cartController.emptyCart);
router.post('/product/:id', cartController.addProduct);
router.post('/:id/product/update/:product', cartController.updateProduct);
router.post('/:id/product/delete/:product', cartController.removeProduct);
router.post('/address/:id', cartController.addAddress);
router.post('/user/:id', cartController.addUser);
router.post('/delete/:id', cartController.deleteCart);

module.exports = router;