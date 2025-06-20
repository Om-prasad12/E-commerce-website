const express = require('express')
const { createProduct,getAllProducts,getProductsByCategory,getProductById,updateProduct,deleteProduct,addReview,addrattings} = require('../controller/prodController');
const { upload } = require('../middleware/multer');
const { isAuthenticated, isAdmin,verifyUser,attachUserInfo} = require('../middleware/authMiddleware');
const prodRouter=express.Router();



// Routes for products
prodRouter
    .route('/')
    .get(getAllProducts)      
    .post(verifyUser,isAuthenticated, upload.array('image', 5),createProduct);  


prodRouter
    .route('/category/:category')
    .get(getProductsByCategory); 

prodRouter
    .route('/:id')
    .get(getProductById)         
    .patch(verifyUser, attachUserInfo, updateProduct)  
    .delete(verifyUser, attachUserInfo, deleteProduct); 

prodRouter
    .route('/review/:id')
    .patch(verifyUser,attachUserInfo,addReview);
prodRouter
    .route('/rating/:id')
    .patch(verifyUser,attachUserInfo,addrattings);    
    


module.exports = prodRouter;