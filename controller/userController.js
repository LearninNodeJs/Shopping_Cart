var passport = require('passport');

exports.userSignUp = passport.authenticate('local.signup',{
    failureRedirect:'/user/signup',
    failureFlash:true
}),function(req,res,next){
    if(req.session.oldUrl){
        res.redirect(req.session.oldUrl);
        req.session.oldUrl = null;
    }else{
        res.redirect('user/profile');
    }
};
exports.userSignin = passport.authenticate('local.signin',{
   failureRedirect:'/user/signin',
   failureFlash:true
}), function(req,res,next) {
    if(req.session.oldUrl){
        res.redirect(req.session.oldUrl);
        req.session.oldUrl = null;
    }else{
        res.redirect('user/profile');
    }
};