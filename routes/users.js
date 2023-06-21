const express = require('express');
const passport = require('passport');
const router = express.Router();

const user_controller = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication ,user_controller.profile);
router.get('/signup', user_controller.signup);
router.get('/signin', user_controller.signin);

router.post('/create',user_controller.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),user_controller.createsession);

router.get('/sign-out',user_controller.destroysession);

module.exports = router;