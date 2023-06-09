const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id).then((users,err) => {
        return res.render('user', {
            title : "Good",
            profile_users : users
        });
    });
}
module.exports.update = async function (req, res) {

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body).then((user,err) => {
    //         return res.redirect('back');
    //     });
    // }else {
    //     return res.status(401).send('Unauthenticated');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedavatar(req,res,function(err){
                if(err){
                    console.log("multer error: " , err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error', err);
            return res.redirect('back'); 
        }

    }else{
        return res.status(401).send('Unauthenticated');
    }
    
};
module.exports.signin = function(req,res){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {title : "Codial | Signin"});
}
module.exports.signup = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
module.exports.createsession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}
module.exports.destroysession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have logged out'); 
        return res.redirect('/');
      });
}
// module.exports.forgotpassword = async function(req, res){

//     const result = await User.findOne({email : req.body.email});

//     if(result){
        
//     }else{
//         req.flash('error',"Email not found");
//         return res.redirect('back');
//     }
// } 