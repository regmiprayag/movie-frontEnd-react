import React, { useEffect, useState } from 'react'
import { getMovieById } from '../../api-helpers/api-helper';

const Tickets = ({ticket,movieId}) => {
  const [movies, setmovies] = useState()
  const [seats, setSeats] = useState([])

    const loadData = ()=>{
        getMovieById(movieId)
            .then((res)=>{
                console.log("Movies details are: ",res.movies.title);
                setmovies(res.movies);
            })
    }

    useEffect(()=>{
        loadData()
    },[])

  return (
    <div className="w-80 bg-[#182356] rounded-xl h-fit text-white">
      <div className="h-full">
            {movies && (
        <div className="p-4">
          <div className="text-sm text-gray-400 mt-2">Movie: {movies.title}</div>
          <div className="text-sm text-gray-200 mt-2">Show Date: {ticket.showDate}</div>
          <div className="text-sm text-gray-400 mt-2">Booked Seat: {ticket.selectedSeats.map((seat)=>(<span className='mx-2 text-white'>{seat} </span>))}</div>
          <div className="text-sm text-gray-400 mt-2">Showtime: {ticket.showtime}</div>
          <div className="text-sm text-gray-400 mt-2">Status: <span className='bg-green-600 px-2 rounded-xl text-white'>{ticket.status}</span></div>
        </div>
          )}
      </div>
    </div>
  )
}

export default Tickets