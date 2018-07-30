var Cart  = require('../models/cart');

exports.reduceByOne = function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart:{});
    cart.reduceByOne(productId);
    req.session.cart =cart;
    res.redirect('/shop-cart')
};
exports.removeItems = function (req,res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart:{});
    cart.removeItems(productId);
    req.session.cart = cart;
    res.redirect('/shop-cart');
};