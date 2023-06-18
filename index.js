const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// use express router
app.use(express.urlencoded());
app.use(cookieparser());
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static("./assets"));
app.use(expresslayouts);
app.use('/', require('./routes/index2'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
