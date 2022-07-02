import axios from 'axios'

const API_URL = '/api/tickets/'

//Get Single Ticket Notes
const getNotes = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+ticketID+'/notes',config)
    return response.data
}

//Add Ticket Notes
const createNote = async (noteText,ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL+ticketID+'/notes',{text:noteText},config)
    return response.data
}

const noteService = {
    getNotes,
    createNote
}

export default noteService