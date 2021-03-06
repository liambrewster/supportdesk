import axios from 'axios'

const API_URL = '/api/tickets/'

//create a new ticket
const createTicket = async (ticketData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,ticketData,config)
    return response.data
}
//Get all Tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

//Get Single Ticket
const getTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+ticketID,config)
    return response.data
}
//Close Ticket
const closeTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+ticketID,{status:'closed'},config)
    return response.data
}


const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService