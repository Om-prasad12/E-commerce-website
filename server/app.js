const express = require('express')
const app = express()
const port=process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
require('dotenv').config();


app.listen(port,(req, res)=> { 
    console.log("Connection has been made")
})



// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

const userRouter=require('./Routers/userRouter');
const prodRouter=require('./Routers/prodRouter');
const authRouter=require('./Routers/authRouter');
const homeRouter=require('./Routers/homeRouter');

app.use('/prod',prodRouter);
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/home',homeRouter); 




app.use((req,res)=>{
    res.status(404).send('404 Page not found')
})
