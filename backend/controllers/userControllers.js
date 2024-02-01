//handling error for async function
const asyncHandler = require('express-async-handler')

// importing User model from models
const {User, Task} = require('../model/userSchema')

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


const usersEmail = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


const assignTask = asyncHandler(async (req, res) => {
  try {
    const { email, title, description, due_date } = req.body;
    // console.log(email, title, description, due_date, "asssign");

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new task
    const newTask = new Task({
      title,
      description,
      due_date,
    });

    // console.log(newTask);
    console.log(user);
    // Add the new task to the user's tasks
    user.tasks.push(newTask);

    // Save the updated user with the new task
    await user.save();
    console.log(user);

    res.status(200).json({ message: 'Task assigned successfully' });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = { registerUser, authUser, usersEmail , assignTask}