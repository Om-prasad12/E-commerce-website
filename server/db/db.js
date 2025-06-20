const mongoose = require('mongoose')


const _db=process.env.DB
mongoose.connect(_db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;