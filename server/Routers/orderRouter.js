const express = require('express')
const { isAuthenticated, isAdmin,verifyUser,attachUserInfo} = require('../middleware/authMiddleware');
const { getAllOrders, getOrderById,createOrder, updateOderStatus } = require('../controller/orderController');
const { get } = require('mongoose');
const orderRouter=express.Router();

orderRouter
.route('/')
.get(verifyUser,isAdmin,getAllOrders)
.post(verifyUser,createOrder);


orderRouter
.route('/:id')
.get(verifyUser,getOrderById)
.patch(verifyUser,isAdmin,updateOderStatus)

module.exports = orderRouter;