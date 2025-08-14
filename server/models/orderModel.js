const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    pincode: String,
    state: String,
    country: String
  },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
  },
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;