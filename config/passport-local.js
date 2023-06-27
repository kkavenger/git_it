const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
       usernameField: 'email',
       passReqToCallback : true,
     },
     function(req,email, password ,done) {
        User.findOne({email: email}).then((result,err) => {
            if (err) {
                req.flash('error',err);
                return done(err);
            }
            if(!result || password !== result.password) {
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,result);
        });
    }
));
passport.serializeUser(function(result,done) {
    done(null,result.id);
});
passport.deserializeUser(function(id,done) {
    User.findById(id).then((result,err) => {
        if(err) {
            console.log("Error in finding user",err);
            return done(err);
        }
        return done(null,result);
    });
});
passport.checkAuthentication = function(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;