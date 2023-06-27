const post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
    
    try{

        let resu = await post.create({
            Content: req.body.Content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : resu
                },
                message : "Post created!"
            });
        }
        //req.flash('success','posted successfully');
        return res.redirect('back');

    }catch(err){

        req.flash('error',err);
        return res.redirect('back');
    }

}
module.exports.destroy = async function(req, res) {
    
    try{

        const result = await post.findById(req.params.id);

        if(result.user == req.user.id){
            result.deleteOne();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Comment deleted successfully'
                });
            }

            //req.flash('success','Successfully deleted Post and associated comments');
            return res.redirect('back');
        }else{
            req.flash('error','YOU cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}