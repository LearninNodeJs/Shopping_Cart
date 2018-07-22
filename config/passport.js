var passport = require('passport');
var userModel = require('../models/user');
var localStrategy = require('passport-local').Strategy;

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
        User.findOne({'email':email},function(err,user){
           if(err){
               return done(err);
           }
           if(user){
               return done(null,false,{message: 'Email is already in use'});
           }
           var newUser = new User();
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