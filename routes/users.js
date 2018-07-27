var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

var userController = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*Handles sign up*/
router.get('/signup',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken() ,messages:messages,hasErrors:messages.length>0});
});
router.post('/signup',userController.userSignIn);


router.get('/signin',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});
router.post('/signin',passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true
}));
router.get('/profile',isLoggedIn,function (req,res,next) {
    res.render('user/profile');
});
router.use('/',notLoggedIn,function(req,res,next){
    next();
});

router.get('/logout',function(req,res,next){req.logout();res.render('/signin')});
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
  return redirect('/');
}
