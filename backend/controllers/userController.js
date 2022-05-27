const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


// @desc        Register a User
// @route       /api/users
// @access      Public
const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body

    // validate the data
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please Fill All Fields With Data')
    }
    // user exists?
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // create the user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user) {
        res.status(201).json({
           _id:user._id,
           name:user.name,
           email:user.email

        })
    } else {
        res.status(400)
        throw new error('invalid user data')
    }


 res.send('Register Route')
})

// @desc        Login a User
// @route       /api/users/login
// @access      Public
const loginUser = asyncHandler(async(req,res) => {
 res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}