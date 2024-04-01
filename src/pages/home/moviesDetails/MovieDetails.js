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

  const handleClick = (id, showTime, showDate) => {
    sessionStorage.setItem("showtimeId", id);
    sessionStorage.setItem("showTime", showTime);
    sessionStorage.setItem("showDate", showDate);
    navigate(`/booking/${movie._id}`);
  };

  const currentDate = new Date();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zero to minutes if less than 10
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the time as "hh:mm AM/PM"
  const formattedTime = hours + ":" + paddedMinutes + " " + meridiem;

  // console.log("The showtimes are: ",movieShowtime)
  console.log("Movie Showtime details are: ", showtimes);
  console.log("The showtime is: ", formattedTime);

  const currentTime = new Date();

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
          {/* <div className="gap-1" key={movie._id}>
            {movieShowtime
              // Sort the showtimes by date and time
              .sort((a, b) => {
                // Convert showtime strings to Date objects for comparison
                const timeA = new Date(`${a.showDate} ${a.showTime}`);
                const timeB = new Date(`${b.showDate} ${b.showTime}`);
                return timeA - timeB; // Sort by ascending order of time
              })
              // Map over the sorted showtimes
              .map((showtime) => {
                // Convert the showtime to a Date object
                const showtimeDate = new Date(
                  showtime.showDate + " " + showtime.showTime
                );

                // Check if the showtime is in the future
                const isFutureShowtime = showtimeDate > currentTime;

                // Define the button class based on whether it's a future showtime or not
                const buttonClass = `border border-gray-400 w-18 text-sm mt-4 p-1 mx-1 rounded-md ${
                  isFutureShowtime
                    ? "border border-green-800 border-2 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
                    : "text-slate-500 cursor-not-allowed"
                }`;

                return (
                  <button
                    key={showtime._id}
                    onClick={
                      isFutureShowtime
                        ? () =>
                            handleClick(
                              showtime._id,
                              showtime.showTime,
                              showtime.showDate
                            )
                        : null
                    }
                    className={buttonClass}
                    disabled={!isFutureShowtime}
                  >
                    {showtime.showTime}
                  </button>
                );
              })}
          </div> */}
          <div className="gap-1" key={movie._id}>
            {movieShowtime
              .filter((showtime) => showtime.movieId === movie._id) // Filter showtimes by movie ID
              .sort((a, b) => {
                // Sort the filtered showtimes by date and time
                const timeA = new Date(`${a.showDate} ${a.showTime}`);
                const timeB = new Date(`${b.showDate} ${b.showTime}`);
                return timeA - timeB; // Sort by ascending order of time
              })
              .map((showtime) => {
                const showtimeDate = new Date(
                  `${showtime.showDate} ${showtime.showTime}`
                );
                const isFutureShowtime = showtimeDate > currentTime;
                const buttonClass = `border border-gray-400 w-18 text-sm mt-4 p-1 mx-1 rounded-md ${
                  isFutureShowtime
                    ? "border border-green-800 border-2 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
                    : "text-slate-500 cursor-not-allowed"
                }`;

                return (
                  <button
                    key={showtime._id}
                    onClick={
                      isFutureShowtime
                        ? () =>
                            handleClick(
                              showtime._id,
                              showtime.showTime,
                              showtime.showDate
                            )
                        : null
                    }
                    className={buttonClass}
                    disabled={!isFutureShowtime}
                  >
                    {showtime.showTime}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
