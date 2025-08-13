const express = require('express')
const { createCheckoutSession,verifyPayment } = require('../controller/paymentController');

const paymentRouter = express.Router();

paymentRouter
.route('/create-checkout-session')
.post(createCheckoutSession);

paymentRouter
.route('/verify-payment')
.get(verifyPayment);

module.exports = paymentRouter;
