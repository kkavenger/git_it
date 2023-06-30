const Post = require('../../../models/post')
const Comment = require('../../../models/comments')

module.exports.index = async function(req,res){

    const result = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user',
            }
        });
    return res.json(200,{
        message : "Lists of posts",
        posts: result
    })
}
module.exports.destroy = async function(req, res) {
    
    try{

        const result = await Post.findById(req.params.id);

        if(result.user == req.user.id) {

            result.deleteOne();
            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message: 'Post and comment deleted successfully'
            })
        }else{
            return res.json(401, {
                message: 'You do not have permission to delete this post and associated comment'
            })
        }
        
    }catch(err){
       return res.json(401,{
        message : "Internal Server Error"
       });
    }
}