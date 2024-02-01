const express= require('express');
const dotenv = require('dotenv');
const connectDB=require('./config/db')
var cors = require('cors')
const userRoutes=require("./routes/userRoute");
const app=express();

app.use(cors())

dotenv.config()
app.use(express.json())

connectDB();

//for register , Login and search user api
app.use('/api',userRoutes);


app.listen(4040,()=>{
    console.log(`app is running on 4040}`)
})