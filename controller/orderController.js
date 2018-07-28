var Order = require('../models/order');
var Cart = require('../models/cart');
exports.populateView = function(req,res,next){
    Order.find({user: req.user},function(err, orders){
        if(err){
            return res.write('Error');
        }
        var cart;
        orders.forEach(function(order){
           cart = new Cart(order.cart);
           order.items = cart.generateItemsArray();
        });
        res.render('user/profile',{orders:orders,existOrders:orders.length>0})
    });
};