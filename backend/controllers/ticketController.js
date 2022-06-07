const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


// @desc        Get User Tickets
// @route       GET /api/tickets
// @access      Private
const getTickets = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    const tickets = await Ticket.find({user:req.user.id})

    
    res.status(200).json(tickets)
   })

// @desc        Create New Ticket
// @route       POST /api/tickets
// @access      Private
const createTicket = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }
    const {product,description} = req.body
    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product & description')
    }
    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
    })
    if(ticket) {
        res.status(201).json({
           message:'Ticket Created',
           id: ticket._id

        })
    } else {
        res.status(400)
        throw new Error('invalid data, ticket not created')
    }
   })

module.exports = {
    getTickets,
    createTicket
}