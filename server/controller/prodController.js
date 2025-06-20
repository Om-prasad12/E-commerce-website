const ProductModel = require('../models/prodModel');
const fs = require('fs');
const { upLoadOnCloudinary } = require('../utils/cloudinary');




const createProduct = async (req, res) => {
  try {
    const {
      title, description, category, brand, price,
      discount, stock, minOrderQty, maxOrderQty,
      tags, isFeatured
    } = req.body;
    
     
    let imageUrls = [];
    console.log('Files received:', req.files);
    if (req.files && req.files.length > 0) {
      console.log('Files received:', req.files);

      for (const file of req.files) {
        const result = await upLoadOnCloudinary(file.path); 
        if (result?.secure_url) {
          imageUrls.push(result.secure_url);
        }
        // Remove file from local uploads folder
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }


    const newProduct = new ProductModel({
      title,
      description,
      category,
      brand,
      price,
      discount,
      stock,
      minOrderQty,
      maxOrderQty,
      tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
      isFeatured,
      images: imageUrls,
      userId: req.userId
    });
    if (!req.body.sku) {
            // Generate a more standardized SKU format: CATEGORY-TYPE-UNIQUE
            const timestamp = Date.now().toString().slice(-6); // Unique timestamp component
            const categoryCode = newProduct.category ? newProduct.category.slice(0, 3).toUpperCase().replace(/\s+/g, '') : 'CAT';
            const titleCode = newProduct.title ? newProduct.title.slice(0, 3).toUpperCase().replace(/\s+/g, '') : 'PRD';
            const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
            newProduct.sku = `${categoryCode}-${titleCode}-${timestamp}-${randomChars}`;
        }

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      newProduct
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const products = await ProductModel.find().skip(skip).limit(limit).lean();
        
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getProductsByCategory= async (req,res) =>{
    try{
        const { category } = req.params;
        const products = await ProductModel.find({ category: new RegExp(category, 'i') }).lean(); // Case-insensitive search
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).lean();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try { 
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Check if user is authorized to update the product
        if (!req.isAdmin && product.userId.toString() !== req.userId.toString() ) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        } 
        console.log('Product updated successfully:', updatedProduct);
        res.status(200).json({message: 'Product created successfully',product: updatedProduct,createdAt: updatedProduct.createdAt,});
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!req.isAdmin && product.userId.toString() !== req.userId.toString() ) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const addReview = async (req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        const { comment } = req.body;
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        const review = {
            user: req.userId,
            name: req.userName, 
            comment: comment,
        };
        // Check if user has already reviewed this product
        const userReviewIndex = product.reviews ? 
            product.reviews.findIndex(r => r.user && r.user.toString() === req.userId.toString()) : -1;

        if (userReviewIndex !== -1) {
            // Update existing review
            product.reviews[userReviewIndex].comment = comment;
            product.reviews[userReviewIndex].updatedAt = new Date();
        } else {
            // Add new review if user hasn't reviewed before
            product.reviews = product.reviews || [];
            product.reviews.push(review);
        }
        // Save the updated product
        await product.save();
        
        res.status(200).json({ 
            message: 'Review added successfully', 
            product 
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const addrattings = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const { rating } = req.body;
        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5' });
        }
        // Update ratings and numReviews
        const previousNumReviews = product.numReviews || 0;
        product.numReviews = previousNumReviews + 1;
        
        if (previousNumReviews === 0) {
            product.ratings = rating;
        } else {
            product.ratings = ((product.ratings * previousNumReviews) + rating) / product.numReviews;
        }

        await product.save();
        
        res.status(200).json({ 
            message: 'Rating added successfully', 
            product 
        });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}



module.exports = { createProduct,getAllProducts,getProductsByCategory, getProductById, updateProduct, deleteProduct, addReview,addrattings};