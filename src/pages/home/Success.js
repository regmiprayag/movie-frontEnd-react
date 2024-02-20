import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { createBooking } from '../../api-helpers/api-helper';

const Success = () => {
  const location = useLocation()
  const movie = useParams();

  // const seatNumber = location.state.selectedSeats;
  const showTimeId = location.state.id;
  let selectedSeats = 2;
  const createBook = async()=>{
    const movieId = movie;
    const token = location.search.split("data=")[1];

    createBooking(selectedSeats,location.state.id,movieId)
      .then((res)=>{console.log("aayo response hai",res)})
  }

  useEffect(()=>{
    // console.log("Showtime Id ",location.state.showtimeId);
    // console.log("Movie Id: ",movie);
    console.log("Showtime is ",location.state.id);
    createBook();
  },[movie])

  return (
    <div className='text-white text-3xl'>Success</div>
  )
}

export default Success
