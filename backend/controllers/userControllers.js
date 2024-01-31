//handling error for async function
const asyncHandler = require('express-async-handler')

// importing User model from models
const User = require('../model/userSchema')

// registerUser Logic 
const registerUser = asyncHandler(async (req, res) => {
  const { email, role, password } = req.body;
  console.log(email, role, password, "register");

  if (!role || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields")
  }

  const userExist = await User.findOne({ email })


  if (userExist) {
    res.status(400)
    throw new Error("user already exist ")
  }

  const user = await new User({
    role, email, password,
  })

  const saveUser = await user.save();


  if (saveUser) {
    res.status(201).json({
      _id: saveUser._id,
      email: saveUser.email,
      password: saveUser.password,
      role: saveUser.role
    })
  }
  else {
    res.status(400);
    throw new Error("Failed to create the user")
  }
}
)

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && ((user.password == password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role
    })
  }
  else {
    res.status(400)
    throw new Error("Invalid Email or Password")
  }
})

module.exports = { registerUser, authUser }