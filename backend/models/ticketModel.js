const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    },
    product:{
        type: String,
        required:[true, 'Please add a product'],
        enum:['iPhone','MacBook Pro', 'iMac', 'iPad'],
    },
    description:{
        type: String,
        required:[true, 'Please add a description']
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Open', 'Closed'],
        default: 'New',
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model('Ticket', ticketSchema)