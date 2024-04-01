import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { createBooking, getMovieById, getShowtimeById, getUserById } from '../../api-helpers/api-helper';
import { toast } from 'react-toastify';

const Success = () => {
  const location = useLocation()
  const movie = useParams();
  const [tickets, setTickets] = useState({})
  const ticketRef = useRef(null)
  const [movies, setMovies] = useState({})
  const [showtimeDetails, setshowtimeDetails] = useState({})
  const [user, setuser] = useState({})
  const [bookingCreated, setbookingCreated] = useState(false)
  const [val, setVal] = useState(1)

  let selectedSeats = 2;

  useEffect(()=>{
    if(!bookingCreated){
      createBook();
    }
  },[])

  const createBook = async()=>{
    const showtimeId = sessionStorage.getItem('showtimeId');
    const movieId = movie;
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    const showtime = sessionStorage.getItem('showTime');
    const showDate = sessionStorage.getItem('showDate');
    const userId = localStorage.getItem('userId');
    const uuid = sessionStorage.getItem('uuid');
    const token = location.search.split("data=")[1];

    createBooking(selectedSeats,movieId,showtimeId,showtime,showDate,userId,uuid)
      .then((res)=>{
        setTickets(res.tickets);
        getMovieById(res.tickets.movieId)
          .then((res)=>{setMovies(res.movies)})
          getUserById(userId)
          .then((res)=>{setuser(res.users)})
        setbookingCreated(true);
        sessionStorage.removeItem("selectedSeats");
        sessionStorage.removeItem("value");
        sessionStorage.removeItem("showtimeId");
    }
    )
  }

  const downloadTicket = (e) => {
    e.preventDefault();
    const ticketContent = ticketRef.current.outerHTML;
    const blob = new Blob([ticketContent], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'ticket.html';

    downloadLink.click();
}
useEffect(()=>{
  console.log("The value in tickets are: ",tickets);
},[])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {
        bookingCreated && (
    
    <div ref={ticketRef} className=" bg-white gap-4 rounded w-80 flex flex-col p-5 justify-center items-center">
      {/* <img src={`http://localhost:8000/images/${movies.posterUrl}`} className='h-44 w-32 rounded-xl' alt='dummy' /> */}
        <div className="w-full border-2 border-gray-500 border-dashed p-4 h-auto">
            <p className="text-black text-lg font-bold truncate m-2">Name: {user.name}</p>
            <h2 className="text-black text-sm bg-yellow-200 text-black m-2">Movie: {movies.title}</h2>
            <p className="text-black truncate text-sm bg-yellow-200 text-black m-2">Watch Date: {tickets.showDate}</p>
            <p className="text-black truncate text-sm bg-yellow-200 text-black m-2">Showtime: {tickets.showtime}</p>
            <p className="text-black text-sm text-sm bg-yellow-200 text-black m-2">BookedSeats: {tickets.selectedSeats}</p>
        </div>
        <div>
           <button onClick={(e)=>{downloadTicket(e)}} className="text-gray-900 px-3 text-sm py-1.5 rounded bg-blue-200 hover:bg-blue-400 transition">Download</button>
        </div>
    </div>
      )}
</div>
  )
}

export default Success

