const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user', {title : "Good"});
}
module.exports.signin = function(req,res){
    console.log(req.cookies);
    return res.render('user_signin', {title : "Codial | Signin"});
}
module.exports.signup = function(req,res){
    return res.render('user_signup', {title : "Codial | Signup"});
}
module.exports.create = function(req,res){

    if(req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email}).then((result,err) => {

        if(err){
            console.log("Error in creating finding user");
            return;
        }
        if(!result){
            User.create({
                email : req.body.email,
                password : req.body.password,
                name : req.body.name,
            }).then((User,err) => {
                if(err){
                    console.log("Error in creating new user");
                    return;
                }
                return res.redirect('/users/signin');
            });
       }else{
            return res.redirect('back');
        }
    });
}
module.exports.createUser = function(req,res){
    
}