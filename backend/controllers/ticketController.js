const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


// @desc        Get User Tickets
// @route       GET /api/tickets
// @access      Private
const getTickets = asyncHandler(async(req,res) => {
    
    res.status(200).json({message:'Get Tickets'})
   })

// @desc        Create New Ticket
// @route       POST /api/tickets
// @access      Private
const createTicket = asyncHandler(async(req,res) => {
    
    res.status(200).json({message:'Create Ticket'})
   })

module.exports = {
    getTickets,
    createTicket
}