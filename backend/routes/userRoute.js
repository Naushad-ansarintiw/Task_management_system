const express=require('express')
const router=express.Router()

// const protect =require('../middleware/authMiddleware')

const {registerUser, authUser, usersEmail, assignTask, getUser}=require('../controllers/userControllers')

router.route('/register').post(registerUser);

router.route('/login').post(authUser)

router.route('/getUserEmails').get(usersEmail)

router.route('/assignTask').post(assignTask)

router.route('/getUserData/:id').get(getUser)

module.exports=router;