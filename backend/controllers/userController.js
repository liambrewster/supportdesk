const asyncHandler = require('express-async-handler')


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