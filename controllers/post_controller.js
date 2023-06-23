const post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    post.create({
        Content: req.body.Content,
        user: req.user._id
    }).then((result,err) => {
        if(err) {
            console.log("Error creating post");
            return;
        }
        return res.redirect('back');
    });
}
module.exports.destroy = function(req, res) {
    // console.log(req.params.id);
    post.findById(req.params.id).then((result,err) => {

        //  console.log(result);
        if(result.user == req.user.id){
            result.deleteOne();
            Comment.deleteMany({post: req.params.id}).then((err) => {
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}