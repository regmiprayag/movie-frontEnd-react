import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  getSeats,
  getMovieDetails,
  createOrderEsewa,
  createBooking,
} from "../../api-helpers/api-helper";

export const Booking = () => {
  const [movie, setMovie] = useState({});
  const id = useParams().id;
  const [seats, setSeats] = useState({});
  const [showtime, setShowtime] = useState({});
  const [seatArr, setSeatArr] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const loadSeats = async (showtime_id) => {
    await getSeats(showtime_id)
      .then((res) => setSeats(res))
      .catch((err) => console.log(err));
  };

  const checkArr = Array(10)
    .fill()
    .map((elem, index) => index + 1);
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
    console.log(selectedSeats);
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
    }
  };

  useEffect(() => {
    setSeatArr(seats.seatNumber);
    console.log("ShowtimeId ho hai",location.state.id)
    // console.log("Seats haru hun hai",location.state.selectedSeats)

  }, [seats]);

  const handleSubmit = (selectedSeats, showtimeId) => {
    // const movieId = req.params()
    const data = {
      selectedSeats: selectedSeats,
      showtimeId: showtimeId,
    };
    const amt = selectedSeats.length * 1;
    const amtData = {
      amount: amt,
      movieId: movie._id,
    };


    createOrderEsewa(amtData)
    .then((res)=>{ esewaCall(res.formData) }).catch(err=>{console.log(err)});

    const esewaCall = (formData) => {
      formData['showtimeId'] = showtimeId
      formData['selectedSeats'] = [selectedSeats]
      // return console.log(formData)
      localStorage.setItem('showtimeId',showtimeId)
      localStorage.setItem('selectedSeats',JSON.stringify(selectedSeats))
      // return console.log(formData); 
      var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (var key in formData) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", formData[key]);
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
      // navigate(`/${movie._id}/success`, {state:{selectedSeats, showtimeId}});
    };
  };
  return (
    <div className="text-white">
      <Typography
        variant="h2"
        color="blue-gray"
        className="mb-2 mt-8 flex mx-40"
      >
      {movie.title}
      </Typography>
      <div class="flex m-auto mx-40">
            <div class="sold flex m-2 gap-2">
              <span class="text-white">Sold</span>
              <button class="p-3 bg-red-700 rounded" />
            </div>
            <div class="available flex m-2 gap-2">
              <span class="text-white">Available</span>
              <button class="p-3 bg-gray-400 rounded" />
            </div>
          </div>
      {/* <div className="mx-40 text-white">{location.state.id}</div> */}
      <div className="mx-40 flex gap-40">
        <Card className="mt-6 w-96 p-2 border-2 text-white bg-black">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={`http://localhost:8000/images/${movie.posterUrl}`}
              className="w-full h-60 rounded-2xl mt-8"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-2 m-4 text-3xl"
            >
              {movie.title}
            </Typography>
            <Typography className=" mx-4 mt-4">
              <span className="text-red-400 font-bold">Description:</span> {movie.description}
            </Typography>
            <Typography className=" mx-4 mt-4">
            <span className="text-red-400 font-bold">Release Date:</span> {new Date(movie.releaseDate).toDateString()}
            </Typography>
            <Typography className=" mx-4 mt-4">
            <span className="text-red-400 font-bold">Actors:</span> {movie.actors}
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
          
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-2 m-8 flex justify-center"
          >
            <div className="flex gap-2">
              {checkArr &&
                checkArr.map((seat, index) => (
                  <>
                    {seatArr?.includes(seat) ? (
                      <button
                        onClick={() => handleClick(index + 1)}
                        className={`p-2 rounded bg-gray-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {seat}
                      </button>
                    ) : (
                      <button
                        className="p-2 cursor-not-allowed rounded bg-red-700"
                        disabled
                      >
                        {seat}
                      </button>
                    )}
                  </>
                ))}
            </div>
          </Typography>
          <div className="bg-red-950 w-80 mx-auto m-10 p-1 rounded-lg text-center">
            S C R E E N
          </div>
          <button
            onClick={() => {
              handleSubmit(selectedSeats, location.state.id);
            }}
            className="bg-blue-400 mx-auto w-40 p-2 rounded-md"
            required
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
