var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
var Cart = require('../models/cart');
var Order = require('../models/order');

var userController = require('../controller/userController');
var orderController = require('../controller/orderController')

router.get('/profile',isLoggedIn,orderController.populateView);
router.get('/test',function(req,res,next){
   res.render('/user/profile')
});
router.get('/logout',function(req,res,next){
    req.logout();
    req.session.cart = null;
    res.redirect('/');
});


router.get('/signup',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken() ,messages:messages,hasErrors:messages.length>0});
});

router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect:'/user/signup',
    failureFlash:true
}),function(req,res,next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('user/profile');
    }
});

router.get('/signin',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect:'/user/signin',
    failureFlash:true
}), function(req,res,next) {
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('user/profile');
    }
});
router.use('/',notLoggedIn,function(req,res,next){
    next();
});



module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/user/signin');
}
function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next;
  }
  return res.redirect('/user/profile');
}
