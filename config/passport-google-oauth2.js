const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({

        clientID: '791140327069-ihr21h2s5ku13qn4rmei7mcjf0q8m9ee.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },

    function(accessToken,refreshToken,profile,done) {

        User.findOne({email : profile.emails[0].value}).exec().then((user,err) => {

            if(err){
                console.log('Error in google strategy',err);
                return;
            }
            console.log(accessToken);
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }).then((result,err) => {
                    if(err){
                        console.log('Error in creating',err);
                        return;
                    }
                    done(null,result);
                });
            }
        })
    }

));