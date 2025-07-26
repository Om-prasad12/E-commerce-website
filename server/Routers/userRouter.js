const express = require('express')
const userRouter=express.Router();
const { verifyUser,isAdmin } = require('../middleware/authMiddleware');
const {getUser,getUserId,getMyProfile,updateMyProfile,deleteMyProfile,
  getMyCart,addToCart,updateCart,getMyWishlist,addToWishlist,deleteWishlist,getMyOrders,addOrderToUser
} = require('../controller/userController');

userRouter
.route('/')
.get(verifyUser,isAdmin,getUser)



userRouter
.route('/me')
.get(verifyUser,getMyProfile)
.patch(verifyUser,updateMyProfile)
.delete(verifyUser,deleteMyProfile)

userRouter
.route('/cart')
.get(verifyUser,getMyCart)
.post(verifyUser,addToCart)

userRouter
.route('/cart/:productId')
.patch(verifyUser,updateCart);

userRouter
.route('/wishlist')
.get(verifyUser,getMyWishlist)
.post(verifyUser,addToWishlist)

userRouter
.route('/wishlist/:productId')
.delete(verifyUser,deleteWishlist);

userRouter
.route('/orders')
.get(verifyUser,getMyOrders)
.post(verifyUser,addOrderToUser);

userRouter
.route('/getProfile/:id')
.get(verifyUser,getUserId)

// .get(Verifyemail);





module.exports = userRouter;