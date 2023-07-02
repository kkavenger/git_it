const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user : 'starmis93@gmail.com',
        pass: 'nhnrelgaxvryvffa'
    }
});

let renderTemplate = (data,relative) => {
    let mainHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer',relative),
        data,
        function (err,template){
            if(err){
                console.log('Error rendering template');
                return;
            }
            mainHtml = template;
        }
    )
    return mainHtml;
}
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}