const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/likes');

module.exports.togglelikes = async function(req, res){

    try{

        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){

            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');

        }

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted = true;
        }else{

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message : 'Request successful',
            data : {
                deleted : deleted,
            },
        })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error',
        });
    }

}