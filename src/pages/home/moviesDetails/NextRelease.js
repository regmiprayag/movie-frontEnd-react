import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShows } from "../../../api-helpers/api-helper";

const NextRelease = ({ movie }) => {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    await getAllShows(movie._id)
      .then((data) => {
        setShowtimes(data);
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
  return (
    // <div className="max-w-sm border border-blue p-3 bg-gray-800 rounded-md gap-4 shadow-2xl">
    //   <div className="relative group">
    //     <img
    //       src="https://www.hindustantimes.com/ht-img/img/2023/09/26/original/Bobby_Deol_Animal_1695709343155.jpg"
    //       className="max-w-64 h-96 rounded-2xl"
    //       alt=""
    //     />

    //     {/* <!-- Buttons container --> */}
    //     <div className="absolute left-4 bottom-10 flex flex-col gap-2 justify-center items-center text-pink-400 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
    //       <button className="bg-white p-2 rounded-xl w-32 hover:bg-pink-200">Play Trailor</button>
    //       <button className="bg-white p-2 rounded-xl w-32 hover:bg-pink-200">View Details</button>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-sm border border-blue p-3 w-full bg-gray-800 rounded-md gap-4 shadow-2xl">
      <div className="mt-4 mx-2">
        <div class="relative group">
          <img
            src={`http://localhost:8000/images/${movie.posterUrl}`}
            className="h-80 w-64 rounded-xl"
            alt="dummy"
          />
          <div className="text-2xl mt-4">{movie && movie.title}</div>
          <div className="text-sm text-gray-400">2 Hours</div>
          <div className="text-sm text-gray-400">Drama, Action</div>
          {/* <!-- Buttons container --> */}
          <div class="absolute left-4 font-semibold bottom-20 flex flex-col gap-2 justify-center items-center text-pink-600 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
            <button class="bg-white text-red-600 p-2 rounded-xl w-32 hover:bg-red-600 hover:text-white">
              Play Trailor
            </button>
            <button class="bg-white text-red-600 p-2 rounded-xl w-32 hover:bg-red-600 hover:text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextRelease;
