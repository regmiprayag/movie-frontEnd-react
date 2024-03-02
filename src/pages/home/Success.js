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

  const createBook = async()=>{
    const showtimeId = sessionStorage.getItem('showtimeId');
    const movieId = movie;
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    const showtime = sessionStorage.getItem('showTime');
    const showDate = sessionStorage.getItem('showDate');
    const token = location.search.split("data=")[1];

    await createBooking(selectedSeats,movieId,showtimeId,showtime,showDate)
      .then((res)=>{
        setTickets(res.tickets);
        getMovieById(res.tickets.movieId)
          .then((res)=>{setMovies(res.movies)})

          // console.log("The res values are: ",res);
          setbookingCreated(true);
        //   return;
        // setTickets(res);
        // getShowtimeById(res.showtimeId)
        //   .then((res)=>{setshowtimeDetails(res.showtime)})
        // getUserById(res.user)
        //   .then((res)=>{setuser(res.users)})
        sessionStorage.removeItem("selectedSeats");
        sessionStorage.removeItem("value");
        sessionStorage.removeItem("showtimeId");
    }
    )
  }

  

  const downloadTicket = (e) => {
    e.preventDefault();
    const ticketContent = ticketRef.current.outerHTML;
    // Convert ticket content to a Blob
    const blob = new Blob([ticketContent], { type: 'text/html' });
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'ticket.html';

    // Trigger download
    downloadLink.click();
}
useEffect(()=>{
  console.log("The value in tickets are: ",tickets);
},[])

  useEffect(()=>{
    if(!bookingCreated){
      createBook();
    }
  },[])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {
        bookingCreated && (
    
    <div ref={ticketRef} className=" bg-white gap-4 rounded w-80 flex flex-col p-5 justify-center items-center">
      {/* <img src={`http://localhost:8000/images/${movies.posterUrl}`} className='h-44 w-32 rounded-xl' alt='dummy' /> */}
        <div className="w-full border-2 border-gray-500 border-dashed p-4 h-auto">
            <p className="text-black text-lg font-bold truncate m-2">Name: {tickets.userId}</p>
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
