const post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    
    try{

        const result = await post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user',
            }
        });
        console.log(result);
        let users = await User.find({});

        return res.render('home', {
            title : "Home",
            posts : result,
            all_users : users
        });

    }catch(err){
        console.error('Error:',err);
    }
}