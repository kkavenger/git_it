const express = require('express');
const app = express();
const path = require('path');
const port = 8000;


// use express router
app.use('/', require('./routes/index2'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
