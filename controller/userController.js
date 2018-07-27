var passport = require('passport');

exports.userSignIn = passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
});