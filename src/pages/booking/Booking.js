import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
// import { getMovieDetails } from "../../api-helper/api-helper";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
// import { dataActions } from '../../store/data';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getSeats, getMovieDetails } from "../../api-helpers/api-helper";
import { FinalBooking } from "./FinalBooking";
import { setData } from "../../store/data";

export const Booking = () => {

  const [movie, setMovie] = useState({});
  // const [seats, setSeats] = useState({})
  const id = useParams().id;
  // console.log(id);
  const [seats, setSeats] = useState({});
  const [showtime, setShowtime] = useState({});
  const [seatArr, setSeatArr] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const location = useLocation();

  const loadSeats = async (showtime_id) => {
    await getSeats(showtime_id).then(res => setSeats(res)).catch(err => console.log(err));
  }

  const checkArr = Array(10).fill().map((elem, index) => (index + 1));
  // console.log(checkArr)

  useEffect(() => {
    loadSeats(location.state.id);
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.movies);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // console.log("movies:",movie)
  const handleClick = (seatNumber) => {
    // console.log(seatNumber)
    console.log(selectedSeats)
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
    }
  };
  // console.log("Available Seats are:",seatArr);
  // console.log("All seats:",checkArr);
  
   /**
   * TODO:
   * fetch available seats from the database -> say arr[]
   * create an array with 10 seats (new) -> say X
   * loop over the items(i) of X and check whether the item(i) exists in the arr[]
   * if exists lable true else false
   */

  useEffect(() => {
    setSeatArr(seats.seatNumber);
  }, [seats]);

  const handleSubmit = (selectedSeats,showtimeId) => {
         const data={
          bookedSeats: selectedSeats,
          showtimeId:showtime
        }
        navigate(`/booking/${movie._id}/create`, {state:{selectedSeats, showtimeId}});       
  }
    return (
    <div className="text-white">
      <Typography variant="h1" color="blue-gray" className="mb-2 m-8 flex justify-center">
        Book Tickts for {movie.title}
      </Typography>
      <div className="mx-40 flex gap-40">
        <Card className="mt-6 w-96 p-2 border-2 text-white bg-indigo-400">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={`http://localhost:8000/images/${movie.posterUrl}`}
              className="w-full h-60 rounded-2xl"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h2" color="blue-gray" className="mb-2 m-4 text-3xl">
              {movie.title}
            </Typography>
            <Typography className=" mx-4 mt-4">
              Description: {movie.description}
            </Typography>
            <Typography className=" mx-4 mt-4">
              Release Date: {new Date(movie.releaseDate).toDateString()}
            </Typography>
            <Typography className=" mx-4 mt-4">
              Actors: {movie.actors}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            {/* <Button className="bg-black w-full">Read More</Button> */}
          </CardFooter>
        </Card>
        <div className="mt-6 border border-transparent h-60 flex flex-col">
        <CardFooter className="pt-0 text-3xl text-blue-200 m-auto">
            Select Seats
          </CardFooter>
          <Typography variant="h3" color="blue-gray" className="mb-2 m-8 flex justify-center">
            <div className="flex gap-2">
              {checkArr && checkArr.map((seat, index) => (
                <>
                {
                  seatArr?.includes(seat) ? <button onClick={() => handleClick(index + 1)} className={`p-2 rounded bg-gray-300 ${selectedSeats.includes(seat)?'bg-green-800':'bg-gray-200'}`}>{seat}</button> : <button className="p-2 cursor-not-allowed rounded bg-red-500" disabled>{seat}</button>
                }
                </>
                
              ))}
            </div>
          </Typography>
          <div className="bg-gray-400 w-60 mx-auto m-10 rounded-lg text-center">Screen</div>
          <button onClick={()=>{handleSubmit(selectedSeats,location.state.id)}} className="bg-blue-400 m-auto w-40 p-2 rounded-md" required>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
