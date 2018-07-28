var express = require('express');
var router = express.Router();
var utilController = require('../controller/util')

router.get('/',utilController.loadHomePage);
router.get('/add-to-cart/:id',utilController.addToCart);
router.get('/shop-cart',utilController.showShoppingcart);
router.get('/checkout',utilController.isLoggedIn,utilController.showIndex);
router.post('/checkout',utilController.isLoggedIn,utilController.checkoutItems);

module.exports = router;