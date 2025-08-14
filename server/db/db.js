const mongoose = require('mongoose');

const connectDB = async () => {
  const _db = process.env.DB;

  try {
    // Wait for MongoDB connection before proceeding
    await mongoose.connect(_db, {
      serverSelectionTimeoutMS: 30000 // 30s timeout for slow Atlas connection
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // exit if DB fails to connect
  }
};

module.exports = connectDB;
