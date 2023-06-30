const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/upload/users/avatars');

const userSchema = new mongoose.Schema({

    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    avatar: {
        type: 'string',
    }
},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVTAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//statics
userSchema.statics.uploadedavatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVTAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;