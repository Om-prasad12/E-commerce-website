const mongoose= require('../db/db');;

const shortid = require('shortid');




const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
    type: String, 
    enum: ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Beauty', 'Sports'],
    required: true,
    },
    brand: {
      type: String,
      default: 'Generic',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    actualPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0, // in percentage
      min: 0,
      max: 100,
    },
    promoTagline:{
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderQty: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxOrderQty: {
      type: Number,
      default: 10,
    },
    images: [ String],
    sku:{
      type: String,
      unique: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin or vendor maybe
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;


