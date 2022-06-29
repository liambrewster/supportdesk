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

//Get Ticket
const getTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+ticketID,config)
    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket
}

export default ticketService