const express = require('express')
const app = express()
const port=process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
var cors = require('cors')
require('dotenv').config();


app.listen(port,(req, res)=> { 
    console.log("Connection has been made")
})



var corsOptions = {
  origin: process.env.BASE_URL.replace(/\/$/, ''),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

const userRouter=require('./Routers/userRouter');
const prodRouter=require('./Routers/prodRouter');
const authRouter=require('./Routers/authRouter');
const homeRouter=require('./Routers/homeRouter');
const orderRouter=require('./Routers/orderRouter');


app.use('/prod',prodRouter);
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/home',homeRouter); 
app.use('/order',orderRouter);



app.use((req,res)=>{
    res.status(404).send('404 Page not found')
})
