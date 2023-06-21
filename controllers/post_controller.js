const post = require('../models/post');

module.exports.create = function(req,res){
    post.create({
        Content: req.body.Content,
        user: req.body._id
    }).then((result,err) => {
        if(err) {
            console.log("Error creating post");
            return;
        }
        return res.redirect('back');
    });
}