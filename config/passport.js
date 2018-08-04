var passport = require('passport');
var userModel = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
   userModel.findById(id,function(err,user){
     done(err,user);
   });
});
passport.use('local.signup',new LocalStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true,
    },
    function(req,email,password,done){
        req.checkBody('email','Invalid Email').notEmpty().isEmail();
        req.checkBody('password','Password Should be atleast 4 characters').notEmpty().isLength({min:4});
        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            errors.forEach(function(error){
               messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages))   ;                     ;
        }
        userModel.findOne({'email':email},function(err,user){
           if(err){
               return done(err);
           }
           if(user){
               return done(null,false,{message: 'Email is already in use'});
           }
           var newUser = new userModel();
           newUser.email = email;
           newUser.password = newUser.encryptPassword(password);
           newUser.save(function(err,result){
              if(err){
                  return done(err);
              }
              return done(null, newUser);
           });
        });
}));
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
        passReqToCallback: true,},
    function(req,email,password,done){
        req.checkBody('email','Invalid Email').notEmpty().isEmail();
        req.checkBody('password','Please Enter Password').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            errors.forEach(function(error){
               messages.push(error);
            });
            return done(null,false, req.flash('error',messages));
        }
        userModel.findOne({'email':email},function(err,user){
           if(err){
               return done(err);
           }
           if(!user){
               return done(null,false,{message: 'User Not Found'});
           }
           if(!user.validPassword(password)){
               return done(null,false,{message: 'Email Or Password is not Correct'});
           }
           return done(null,user);
        });
}));