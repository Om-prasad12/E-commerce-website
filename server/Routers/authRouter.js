const express = require('express')
const authRouter=express.Router();
const { userLogin, userSignup,verifyEmail } = require('../controller/authController');


authRouter
.route('/login')
.post(userLogin);

authRouter
.route('/signup')
.post(userSignup);

authRouter
.route('/:userId/verify-email/:emailToken')
.get(verifyEmail);


module.exports = authRouter;