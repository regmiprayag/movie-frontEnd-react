import React, { useEffect, useState } from 'react'
import { getBookingsByUser, getTickets } from '../../api-helpers/api-helper';
import Tickets from './Tickets';

const MyTickets = () => {
  const [tickets, settickets] = useState([])
  
  const loadData = async()=>{
    const id = localStorage.getItem("userId");
    // console.log("The user is: ",id);
    // getBookingsByUser(id);
    getTickets(id)
      .then((res)=>{
        settickets(res.message);
      })
  }
  console.log("Tickets: ",tickets);
  useEffect(()=>{
    loadData();
  },[])

  return (
    <div className='text-white'>
      <div className='flex mx-auto text-white text-3xl flex justify-center m-6'>My Tickets</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-10/12">
              {tickets?.map((ticket) => (
                <div key={ticket._id}>
                  <Tickets ticket={ticket} movieId={ticket.movieId} />
                </div>
              ))}
      </div>
    </div>
  )
}

export default MyTickets