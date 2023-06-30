const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done){

    User.findById(jwt_payload._id).then((user,err) => {

        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;