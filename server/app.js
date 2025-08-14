require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./db/db'); // path to your db.js

const app = express();
const port = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
  origin: process.env.BASE_URL.replace(/\/$/, ''),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routers
const userRouter = require('./Routers/userRouter');
const prodRouter = require('./Routers/prodRouter');
const authRouter = require('./Routers/authRouter');
const homeRouter = require('./Routers/homeRouter');
const orderRouter = require('./Routers/orderRouter');
const paymentRouter = require('./Routers/paymentRouter');

app.use('/prod', prodRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 Page not found');
});

// Start server **after DB connection**
const startServer = async () => {
  await connectDB(); // Wait for DB connection first
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
