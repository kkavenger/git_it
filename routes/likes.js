const express = require('express');

const router = express.Router();

const likescontroller = require('../controllers/likes_controller');

router.post('/toggle', likescontroller.togglelikes);

module.exports = router;