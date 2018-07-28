var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');

exports.showIndex = function (req,res,next){
    if(!req.session.cart){
        return res.redirect('/shop-cart');
    }
    var cart = new Cart(req.session.cart);
    var errorMessage = req.flash('error')[0];
    res.render('shop/checkout',{total: cart.totalPrice,errorMessage:errorMessage,noErrors:!errorMessage});
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
    var successMessage = req.flash('success')[0];
    Product.find(function(err,docs){
       var productChunks = [];
       var chunkSize=3;
       for(var i =0;i<docs.length;i+=chunkSize){
           productChunks.push(docs.slice(i,i+chunkSize));
       }
       res.render('shop/index',{title:'Shopping Cart Home',products:productChunks,successMessage:successMessage,noMessages:!successMessage});
    });
};
exports.checkoutItems = function (req,res,next) {
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")("sk_test_9kL8Epv2A1WuLdQpFqb46ZQA");
    stripe.charges.create({
        amount: cart.totalPrice * 1000,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if(err){
            req.flash('error',err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err,result){
            req.flash('success','Successfully bought product!');
            req.session.cart = null;
            console.log('Successfully Placed Product in Mongo');
            res.redirect('/');
        });

    });
};
exports.notLoggedIn = function (req,res,next){
    if(!req.isAuthenticated()){
        return next;
    }
    return res.redirect('/');
}
exports.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

