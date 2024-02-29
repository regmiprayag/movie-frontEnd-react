import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllShows,
  getAllShowsToday,
  getAllShowsTomorrow,
} from "../../../api-helpers/api-helper";

const MovieDetails = ({ movie, movieShowtime }) => {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    await getAllShowsToday()
      .then((data) => {
        setShowtimes(data.showtime);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (id) => {
    sessionStorage.setItem("showtimeId", id);
    navigate(`/booking/${movie._id}`);
  };

  const currentDate = new Date();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zero to minutes if less than 10
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Format the time as "hh:mm AM/PM"
  const formattedTime = hours + ':' + paddedMinutes + ' ' + meridiem;

  // console.log("The showtimes are: ",movieShowtime)

  return (
    // <div className="max-w-sm border border-blue w-64 bg-gray-800 rounded-md shadow-2xl">
    <div className="w-68 bg-[#182356] rounded-xl h-76vh">
      <div className="h-full">
        <div className="">
          <img
            src={`http://localhost:8000/images/${movie.posterUrl}`}
            className="h-96 w-full rounded-t-xl"
            alt="dummy"
          />
        </div>
        <div className="p-4">
          <div className="text-2xl mt-2">{movie && movie.title}</div>
          <div className="text-sm text-gray-400 mt-2">2 Hours</div>
          <div className="text-sm text-gray-400 mt-2">Drama, Action</div>
          {/* <!-- Buttons container --> */}
          <div class="absolute left-2 ease-in bottom-24 font-semibold  flex flex-col gap-2 justify-center items-center text-pink-600 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
            <button class="bg-white text-red-600 p-2 rounded-xl w-32 hover:bg-red-600 hover:text-white">
              Buy Tickets
            </button>
            <button class="bg-white text-red-600 p-2 rounded-xl w-32 hover:bg-red-600 hover:text-white">
              Play Trailor
            </button>
          </div>
          <div className="gap-1" key={movie._id}>
            {movieShowtime
              .filter((showtime) => showtime.movieId === movie._id)
              .map((showtime) => (
                <button
                  key={showtime._id}
                  onClick={() => handleClick(showtime._id)}
                  // className="border border-white p-1 w-20 mt-4 mr-1 rounded-md text-white mb-1 hover:bg-green-500"
                  className="border border-white w-18 text-sm mt-4 p-1 mx-1 hover:bg-green-500 rounded-md"
                >
                  {showtime.showTime}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
