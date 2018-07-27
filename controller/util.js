var Cart = require('../models/cart');
var Product = require('../models/product');

exports.showIndex = function (req,res,next){
    if(!req.session.cart){
        return res.redirect('/shop-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout',{total: cart.totalPrice});
};

exports.showShoppingcart = function(req,res,next){
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products:cart.generateItemsArray(),totalPrice:cart.totalPrice});
};

exports.addToCart = function (req,res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart:{});
    Product.findById(productId,function (err,product) {
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart= cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
};
exports.loadHomePage = function(req,res,next){
    Product.find(function(err,docs){
       var productChunks = [];
       var chunkSize=3;
       for(var i =0;i<docs.length;i+=chunkSize){
           productChunks.push(docs.slice(i,i+chunkSize));
       }
       res.render('shop/index',{title:'Shopping Cart Home',products:productChunks});
    });
}

