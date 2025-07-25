const express = require('express')
const authRouter=express.Router();
const { userLogin, userSignup,verifyEmail, checkLoginStatus, userLogout } = require('../controller/authController');
const { verifyUser } = require('../middleware/authMiddleware');


authRouter
.route('/login')
.post(userLogin);

authRouter
.route('/signup')
.post(userSignup);

authRouter
.route('/isloggedin')
.get(verifyUser,checkLoginStatus);

authRouter
.route('/logout')
.get(verifyUser,userLogout);

authRouter
.route('/:userId/verify-email/:emailToken')
.get(verifyEmail);




module.exports = authRouter;