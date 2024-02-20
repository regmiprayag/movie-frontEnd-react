import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { createBooking, getMovieById, getShowtimeById, getUserById } from '../../api-helpers/api-helper';

const Success = () => {
  const location = useLocation()
  const movie = useParams();
  const [tickets, setTickets] = useState({})
  const ticketRef = useRef(null)
  const [movies, setMovies] = useState({})
  const [showtimeDetails, setshowtimeDetails] = useState({})
  const [user, setuser] = useState({})

  // const seatNumber = location.state.selectedSeats;
  // const showTimeId = location.state.id;
  let selectedSeats = 2;
  const createBook = async(showtimeId,movieId,selectedSeats)=>{
    // const movieId = movie;
    const token = location.search.split("data=")[1];

    await createBooking(selectedSeats,movieId,showtimeId)
      .then((res)=>{
        console.log(res)
        setTickets(res);
        getMovieById(res.movieid)
          .then((res)=>{setMovies(res.movies)})
        getShowtimeById(res.showtimeId)
          .then((res)=>{setshowtimeDetails(res.showtime)})
        getUserById(res.user)
          .then((res)=>{setuser(res.users)})
      }
      )
  }
  useEffect(()=>{
    console.log("Movies bhetey paxi ko ho ",movies)
  },[movies])

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
    console.log("Showtime Id ",localStorage.getItem('showtimeId'));
    console.log("Movie Id: ",movie);
    console.log("SelectedSeats is ",JSON.parse(localStorage.getItem('selectedSeats')));
    const showtimeId = localStorage.getItem('showtimeId');
    const movieId = movie;
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    createBook(showtimeId,movieId,selectedSeats);
  },[movie])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {tickets && showtimeDetails &&  (
    <div ref={ticketRef} className=" bg-white gap-4 rounded w-80 flex flex-col p-5 justify-center items-center">
      {/* <img src={`http://localhost:8000/images/${movies.posterUrl}`} className='h-44 w-32 rounded-xl' alt='dummy' /> */}
        <div className="w-full border-2 border-gray-500 border-dashed p-4 h-auto">
            <p className="text-black text-lg font-bold truncate m-2">Name: {user.name}</p>
            <h2 className="text-black text-sm bg-yellow-200 text-black m-2">Movie ID: {movies.title}</h2>
            <p className="text-black truncate text-sm bg-yellow-200 text-black m-2">Show Date: {showtimeDetails.showDate}</p>
            <p className="text-black truncate text-sm bg-yellow-200 text-black m-2">Showtime: {showtimeDetails.showTime}</p>
            <p className="text-black text-sm text-sm bg-yellow-200 text-black m-2">BookedSeats: {tickets.seatNumber}</p>
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
