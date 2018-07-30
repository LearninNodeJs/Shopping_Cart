var express = require('express');
var router = express.Router();
var utilController = require('../controller/util');
var reduceController = require('../controller/reduceController');


router.get('/',utilController.loadHomePage);
router.get('/add-to-cart/:id',utilController.addToCart);
router.get('/shop-cart',utilController.showShoppingcart);
router.get('/checkout',utilController.isLoggedIn,utilController.showIndex);
router.post('/checkout',utilController.isLoggedIn,utilController.checkoutItems);

router.get('/reduce/:id',reduceController.reduceByOne);
router.get('/remove/:id',reduceController.removeItems);

module.exports = router;