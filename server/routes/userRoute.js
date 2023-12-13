const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .post('/signup', authController.signup)
    .post('/login', authController.login);

router.get('/logout', authController.logout).get('/test', (req, res) => {
    // console.log(req.headers.authorization);
    // console.log(req.cookies.jwt);
    res.status(200).json({
        time: Date(),
        name: 'fuck you',
    });
});

module.exports = router;
