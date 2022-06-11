const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


// @desc        Get User Ticket(s)(multiple)
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

// @desc        Get Single Ticket for a user
// @route       GET /api/tickets/:id
// @access      Private
const getTicket = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket Not Found, Please Check')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Your are not authorised to see this ticket')
    }
    
    res.status(200).json(ticket)
    
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

// @desc        Delete a Ticket
// @route       DELETE /api/tickets/:id
// @access      Private
const deleteTicket = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket Not Found, Please Check')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Your are not authorised to delete this ticket')
    }
    
    await ticket.remove()
    res.status(200).json({success:true,message:`deleted ${req.params.id}`})
    
   })

// @desc        Update a Ticket
// @route       PUT /api/tickets/:id
// @access      Private
const updateTicket = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket Not Found, Please Check')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Your are not authorised to delete this ticket')
    }

    

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})    
    res.status(200).json(updatedTicket)
    
   })

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}