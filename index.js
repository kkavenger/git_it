const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//authentication library
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportlocal = require('./config/passport-local');
const passportGoogle = require('./config/passport-google-oauth2');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//Setting up socket.io for chat engine
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSocket(chatServer);
chatServer.listen(5000);
console.log("Chat server listening on 5000");
// use express router
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputstyle :'extended',
    prefix : '/css'
}));
app.use(express.static("./assets"));
app.use('/upload', express.static(__dirname + '/upload'));
app.use(expresslayouts);
// app.use('/', require('./routes/index2'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie : {
        maxAge: 1000 * 60 * 100
    },
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/codeial_development', autoRemove : 'disabled'})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash);

app.use('/', require('./routes/index2'));
// app.post('/comments/',)
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
