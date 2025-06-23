const express = require('express')
const homeRouter=express.Router();
const { verifyUser, isAdmin} = require('../middleware/authMiddleware');
const { getHomePageData, getHomePageDataByCategory, createHomePageData, updateHomePageData, deleteHomePageData } = require('../controller/homeController');


homeRouter
.route('/')
.get(getHomePageData)
.post(verifyUser, isAdmin, createHomePageData);

homeRouter
.route('/category/:category')
.get(getHomePageDataByCategory);

homeRouter
.route('/:id')
.patch(verifyUser, isAdmin, updateHomePageData)
.delete(verifyUser, isAdmin, deleteHomePageData);

module.exports = homeRouter;