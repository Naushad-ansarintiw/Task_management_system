const express= require('express');
const dotenv = require('dotenv');
const connectDB=require('./config/db')
const app=express();

dotenv.config()
app.use(express.json())

connectDB();

app.listen(4040,()=>{
    console.log(`app is running on 4040}`)
})