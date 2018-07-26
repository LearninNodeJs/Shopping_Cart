var Cart = require('../models/cart');
exports.showIndex = function (req,res,next){
    if(!req.session.cart){
        return res.redirect('/shop-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout',{total: cart.totalPrice});
};