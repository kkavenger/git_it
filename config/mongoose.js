const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error in MongoDB connection"));

db.once('open', function(){
    console.log('Connected to MongoDB');
});

module.exports = db;