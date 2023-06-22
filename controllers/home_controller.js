const post = require('../models/post');

module.exports.home = function(req, res){
    
    
    post.find({}).populate('user').exec().then((result, err) => {
        return res.render('home', {
            title : "Home",
            posts : result,
        });
    });
}