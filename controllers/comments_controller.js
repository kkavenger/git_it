const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){

     //console.log(req.body);
    try{
        let results = await Post.findById(req.body.post);
        //console.log(results);

        if(results){
            let f = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            });
            //console.log(f);
            results.comment.push(f);
            await results.save();
            //const comment = await Comment.findById(f.id).populate('user').exec();
            f = await f.populate(['user']);
            commentsMailer.newComment(f);
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        fetch : f,
                    },
                    Message : "comment created successfully!"
                });
            }
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