const mongoose = require('mongoose');
//const postController = require("../controllers/post_controller"); // Use "postController" instead of "post_controller

const postSchema = new mongoose.Schema({

    Content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment',
        }
    ]
},{
    timestamps : true
});
const post = mongoose.model('Post', postSchema);
module.exports = post;