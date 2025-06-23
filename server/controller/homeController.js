const homeModel = require('../models/homeModel');

async function getHomePageData(req, res) {
    try{
        const homeData = await homeModel.find().populate();
        if (!homeData || homeData.length === 0) {
            return res.status(404).json({ message: 'No home page data found' });
        }
        res.status(200).json(homeData);
    } catch(error) {
        console.error('Error fetching home page data:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

async function getHomePageDataByCategory(req, res) {
    const { category } = req.params;
    try {
        const homeData = await homeModel.find({ category }).populate('product');
        if( !homeData || homeData.length === 0) {
            return res.status(404).json({ message: `No home page data found for category: ${category}` });
        }
        res.status(200).json(homeData);
        
} catch (error){
        console.error('Error fetching home page data by category:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
}

async function createHomePageData(req, res) {
    const homeData = req.body;
    try {
        const newHomeData = await homeModel.create(homeData);
        res.status(201).json(newHomeData);
    } catch (error) {
        console.error('Error creating home page data:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

async function updateHomePageData(req, res) {
    const { id } = req.params;
    const homeData = req.body;
    try {
        const updatedHomeData = await homeModel.findByIdAndUpdate(id, homeData, { new: true });
        if (!updatedHomeData) {
            return res.status(404).json({ message: 'Product not found not found' });
        }
        res.status(200).json(updatedHomeData);
    } catch (error) {
        console.error('Error updating home page data:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

async function deleteHomePageData(req, res) {
    const { id } = req.params;
    try {
        const deletedHomeData = await homeModel.findByIdAndDelete(id);
        if (!deletedHomeData) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product data deleted from home page successfully' });
    } catch (error) {
        console.error('Error deleting home page data:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

module.exports = {getHomePageData, getHomePageDataByCategory, createHomePageData, updateHomePageData, deleteHomePageData};