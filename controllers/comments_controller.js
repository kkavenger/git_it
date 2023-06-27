const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){

    // console.log(req.body);
    try{
        let results = await Post.findById(req.body.post);

        if(results){
            let fetch = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            });
            results.comment.push(fetch);
            results.save();
            return res.redirect('/');
        }
    }catch(err){
        console.log("Error:",err);
        return;
    }
    
}
module.exports.destroycomment = async function (req, res) {

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postid = comment.post;
            comment.deleteOne();
            let result = await Post.findByIdAndUpdate(postid, {$pull : {comment : req.params.id} });
            return res.redirect('back'); 
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error:",err);
        return;
    }
}