const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "mainCarousel",
        "sales",
        "ourProducts",
        "features",
        "bestSellingProducts",
        "newArrivals",
      ],
    },

    subCategory: {
      type: String,
      enum: [
        "category1",
        "category2",
        "category3",
        "mens",
        "womens",
        "electronics",
      ],
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    validTill: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
  },
  { timestamps: true }
);

const homeModel = mongoose.model("HomeSection", homeSectionSchema);
module.exports = homeModel;
