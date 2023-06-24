const post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    
    
    post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user',
        }
    })
    .exec().then((result, err) => {

        User.find({}).then((users,err) => {

            return res.render('home', {
                title : "Home",
                posts : result,
                all_users : users
            });
        })
    });
}