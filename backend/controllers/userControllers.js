//handling error for async function
const asyncHandler=require('express-async-handler')

// importing User model from models
const User=require('../model/userSchema')

// registerUser Logic 
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,cpassword}=req.body;

    if(!name||!email||!password||!cpassword){
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }
    
    const userExist= await User.findOne({email})


   if(userExist){
    res.status(400)
    throw new Error("user already exist ")
   }

   const user=await new User({
    name,email,password,cpassword,
   })

   const saveUser=await user.save();


    if(saveUser){
        res.status(201).json({
            _id:saveUser._id,
            name:saveUser.name,
            email:saveUser.email,
            password:saveUser.password,
            cpassword:saveUser.cpassword,
            pic:saveUser.pic,
            token:generateToken(saveUser._id),
        })
            }
        else{
            res.status(400);
            throw new Error("Failed to create the user")
        }
    }
)


module.exports={registerUser}