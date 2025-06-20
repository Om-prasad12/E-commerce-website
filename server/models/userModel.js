const mongoose= require('../db/db');
const emailValidator = require('email-validator');
//For Hashing
const bcrypt = require('bcrypt');



  const addressSchema = new mongoose.Schema({
  fullName: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  phone: String,
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  priceAtAddition: Number,
  variant: {
    size: String,
    color: String
  },
  maxQuantity: {
    type: Number,
    default: 10
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate:function(){
      const isEmailValid = emailValidator.validate(this.email);
      if (!isEmailValid) {
            const error = new Error('Please provide a valid email address');
            error.status = 400;
            throw error;  // This will be caught in your error handling middleware
          }
       return isEmailValid;

    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },

  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  confirmPassword: {
    type: String, 
    required: true,
    select: false,
    minlength: 8,
    validate:function(){
      return this.password === this.confirmPassword;
    }
  },

  phone: {
    type: String,
    unique: true,
    required: true,
  },

   isPhoneVerified: {
    type: Boolean,
    default: false
  },

  profilePicture: {
    type: String,
    default: ''
  },

  addresses: [addressSchema],

  cart: [cartItemSchema],

  wishlist: [{
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
  }],

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],

  notifications: [{
    message: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],

  role: {
    type: String,
    enum: ['user', 'admin', 'vendor'],
    default: 'user'
  },


  emailToken: String,

  resetToken: String,
  resetTokenExpiry: Date,

  rewardsPoints: {
    type: Number,
    default: 0
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


userSchema.pre('save', async function() {
   this.confirmPassword=undefined; // Remove confirmPassword before saving
});

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 
   


//Model
const userModel= mongoose.model('User', userSchema);

module.exports = userModel;