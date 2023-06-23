const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req,res){

    // console.log(req.body);
    Post.findById(req.body.post).then((results,err) => {

        if(results){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            }).then((fetch,err) => {
                results.comment.push(fetch);
                results.save();
                return res.redirect('/');
            });
        }
    });
}