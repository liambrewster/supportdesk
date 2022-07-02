import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import {getNotes, reset as notesReset} from '../features/notes/noteSlice'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'



function Ticket() {
    const {ticket, isError, isSuccess, isLoading, message} = useSelector((state) => state.ticket)
    const {notes, isLoading:notesIsLoading} = useSelector((state) => state.note)
    const params = useParams()
    const {ticketId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        //eslint-disable-next-line
    },[isError,message, ticketId])
    

const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

if(isLoading || notesIsLoading){
    return <Spinner/>
}
if(isError){
    return <h3>Something Went Wrong</h3>
}



  return (
    <div className='ticket-page'>
        <header className="ticket-header">
        <BackButton url='/tickets'/>
        <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submited: {new Date(ticket.createdAt).toLocaleString('en-GB')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr/>
        <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
        </div>
        <h2>Notes:</h2>
        {notes.map((note)=> (
            <NoteItem key={note._id} note={note}/>
        ))}
        </header>
        {ticket.status !== 'closed' && (
            <button className="btn btn-block btn-danger" onClick={onTicketClose} >Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket