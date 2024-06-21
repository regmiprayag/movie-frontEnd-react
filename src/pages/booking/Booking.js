import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { getSeats, getMovieDetails, createOrderEsewa, createBooking, createOrderKhalti } from "../../api-helpers/api-helper";
import { toast } from "react-toastify";

export const Booking = () => {
  const [movie, setMovie] = useState({});
  const id = useParams().id;
  const [seats, setSeats] = useState({});
  const [showtime, setShowtime] = useState({});
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatArr, setSeatArr] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [available, setAvailable] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const loadSeats = async (showtime_id) => {
    await getSeats(showtime_id)
      .then((res) => setSeats(res))
      .catch((err) => console.log(err));
  };

  const checkArr = Array(10).fill().map((elem, index) => index + 1);

  useEffect(() => {
    const showtimeId = sessionStorage.getItem("showtimeId");
    loadSeats(showtimeId);
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.movies);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleClick = (seatNumber) => {
    const index = selectedSeats.indexOf(seatNumber);
    let newSelectedSeats = [...selectedSeats];
    if (index === -1) {
      newSelectedSeats.push(seatNumber);
    } else {
      newSelectedSeats.splice(index, 1);
    }
    setSelectedSeats(newSelectedSeats);
    calculateTotalPrice(newSelectedSeats);
  };

  const calculateTotalPrice = (selectedSeats) => {
    const total = selectedSeats.length * price;
    setTotalPrice(total);
  };

  useEffect(() => {
    const calculatePrice = () => {
      const shtime = sessionStorage.getItem("showTime");
      if (!shtime) return;

      const [time, modifier] = shtime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }

      if ((hours >= 0 && hours < 10) || (hours === 10 && minutes === 0)) {
        setPrice(100);
      } else if ((hours >= 10 && hours < 21) || (hours === 21 && minutes === 0)) {
        setPrice(200);
      } else if ((hours >= 21 && hours < 24) || (hours === 0 && minutes === 0)) {
        setPrice(150);
      }
    };

    calculatePrice();
  }, []);

  sessionStorage.setItem("price", price);

  useEffect(() => {
    setSeatArr(seats.seatNumber);
  }, [seats]);

  const handleSubmit = (selectedSeats, showtimeId, showDate) => {
    const data = {
      selectedSeats: selectedSeats,
      showtimeId: showtimeId,
      showDate: showDate,
    };
    const amt = totalPrice; // Updated to use totalPrice
    const amtData = {
      amount: amt,
      movieId: movie._id,
      method:"esewa"
    };

    createOrderEsewa(amtData)
      .then((res) => {
        esewaCall(res.formData);
        sessionStorage.setItem("uuid", res.uuid);
      })
      .catch((err) => {
        console.log(err);
      });

    const esewaCall = (formData) => {
      formData["selectedSeats"] = [selectedSeats];
      sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
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
    };
  };

  const handleSubmitKhalti = (selectedSeats, showtimeId, showDate) => {
    const data = {
      selectedSeats: selectedSeats,
      showtimeId: showtimeId,
      showDate: showDate,
    };
    const amt = totalPrice; // Updated to use totalPrice
    const amtData = {
      amount: amt,
      movieId: movie._id,
      method:"khalti"
    };

    createOrderKhalti(amtData)
      .then((res) => {
        // return
        console.log("The response in createOrderKhalti is: ",res)
        // return
        khaltiCall(res.formData);
        // sessionStorage.setItem("uuid", res.uuid);
      })
      .catch((err) => {
        console.log("error chai hyaa ko ho");
      });

    const khaltiCall = (formData) => {
      // formData["selectedSeats"] = [selectedSeats];
      // sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
      // return
      var path = "https://a.khalti.com/api/v2/epayment/initiate/";
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
    };
  };

  return (
    <div className="text-white">
      <div className="mb-2 mt-8 flex mx-40 text-4xl">{movie.title}</div>
      <div className="flex m-auto mx-40">
        <div className="sold flex m-2 gap-2">
          <span className="text-white">Sold</span>
          <button className="p-3 bg-red-700 rounded cursor-default" />
        </div>
        <div className="available flex m-2 gap-2">
          <span className="text-white">Available</span>
          <button className="p-3 bg-gray-400 rounded cursor-default" />
        </div>
      </div>
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
            <div className="mb-2 mt-8 mx-4 text-3xl">{movie.title}</div>
            <div className=" mx-4 mt-4">
              <span className="text-red-400 font-bold">Description:</span> {movie.description}
            </div>
            <div className=" mx-4 mt-4">
              <span className="text-red-400 font-bold">Release Date:</span> {new Date(movie.releaseDate).toDateString()}
            </div>
            <div className="mx-4 mt-4">
              <span className="text-red-400 font-bold">Actors:</span> {movie.actors}
            </div>
            <div className="mx-4 mt-4">
              <span className="text-red-400 font-bold">Price per Seat:</span> {price}
            </div>
          </CardBody>
        </Card>
        <div className="mt-6 border border-transparent h-60 flex flex-col">
          <CardFooter className="pt-0 text-3xl text-blue-200 m-auto">Select Seats</CardFooter>

          <div className="mb-2 m-8 flex justify-center">
            <div className="flex gap-2">
              {checkArr &&
                checkArr.map((seat, index) => (
                  <>
                    {seatArr?.includes(seat) ? (
                      <button
                        onClick={() => handleClick(index + 1)}
                        className={`p-3 text-3xl rounded bg-gray-200 ${
                          selectedSeats.includes(seat) ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        {seat}
                      </button>
                    ) : (
                      <button className="p-3 text-3xl cursor-not-allowed rounded bg-red-700" disabled>
                        {seat}
                      </button>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="bg-red-950 w-80 mx-auto m-10 p-1 rounded-lg text-center">S C R E E N</div>

          <div className="m-12">
              <span className="text-red-400 font-bold">Total Price:</span> {totalPrice}
            </div>
          <div className="mx-12 gap-10">
            <button
              onClick={() => {
                handleSubmit(selectedSeats, sessionStorage.getItem("showtimeId"), sessionStorage.getItem("showDate"));
              }}
              className="bg-green-400 text-black mx-12 w-40 p-2 rounded-md"
              required
            >
              Book Now Through Esewa
            </button>
            {/* <button
              onClick={() => {
                handleSubmitKhalti(selectedSeats, sessionStorage.getItem("showtimeId"), sessionStorage.getItem("showDate"));
              }}
              className="bg-purple-400 text-white mx-auto w-40 p-2 rounded-md"
              required
            >
              Book Now Through Khalti
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
