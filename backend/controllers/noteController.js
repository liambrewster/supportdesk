const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/noteModel')


// @desc        Get Notes for a Ticket
// @route       GET /api/tickets/:ticketId/notes
// @access      Private
const getNotes = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorised')
    }

    const notes = await Note.find({ticket:req.params.ticketId}) 
    
    res.status(200).json(notes)
   })

// @desc        Add a Note to a Ticket
// @route       POST /api/tickets/:ticketId/notes
// @access      Private
const addNote = asyncHandler(async(req,res) => {
    // get user using Id in JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorised')
    }

    const note = await Note.create({
        user: req.user.id,
        ticket:req.params.ticketId,
        text:req.body.text,
        isStaff:false,
    }) 
    
    res.status(200).json(note)
   })


   module.exports = {
    getNotes,
    addNote
}