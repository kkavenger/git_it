const nodemailer = require('../config/nodemailer');

exports.newComment = (Comment) => {

    let htmlString = nodemailer.renderTemplate({comment : Comment}, '/comments/new_comment.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'starmis93@gmail.com',
        to: Comment.user.email,
        subject: "New Comment published",
        html : htmlString
        }, (err, info) => {
            if(err){
                console.log('Error in sending mail');
                return;
            }
            //console.log('Message sent', info);
            return;
    })
}