import React, { useEffect, useState } from "react";
import MovieDetails from "./moviesDetails/MovieDetails";
import {
  getAllMovie,
  getAllShowsToday,
  getAllShowsTomorrow,
} from "../../api-helpers/api-helper";
import NextRelease from "./moviesDetails/NextRelease";
import { Navbar } from "flowbite-react";

const Home = () => {
  const [movies, setmovies] = useState([]);
  const [todaymovie, setTodaymovie] = useState([]);
  const [tomorrowmovie, setTommorrowmovie] = useState([]);
  const [tomorrowShowtime, setTommorrowShowtime] = useState([]);
  const [today, setToday] = useState({});
  const [tommorrow, setTommorrow] = useState({});
  const [aja, setAja] = useState(true);
  const [buttonTodayClicked, setButtonTodayClicked] = useState(true);
  const [buttonTomorrowClicked, setButtonTomorrowClicked] = useState(false);

  useEffect(() => {
    getAllMovie()
      .then((data) => {
        setmovies(data.movies);
      })
      .catch((err) => {
        console.log("messag:", err);
      });
  }, []);

  const showToday = () => {
    setAja(true);
    setButtonTodayClicked(true);
    setButtonTomorrowClicked(false);
  };

  const showTomorrow = () => {
    setAja(false);
    setButtonTomorrowClicked(true);
    setButtonTodayClicked(false);
  };

  useEffect(() => {
    getAllShowsToday().then((res) => {
      setTodaymovie(res.showtime);
      setToday(true);
    });
  }, []);

  useEffect(() => {
    getAllShowsTomorrow().then((res) => {
      setTommorrowmovie(res.showtime);
    });
  }, []);

  const filteredMoviesToday = movies.filter((movie) =>
    todaymovie.some((today) => today.movieId === movie._id)
  );

  const filteredMoviesTomorrow = movies.filter((movie) =>
    tomorrowmovie.some((tomorrow) => tomorrow.movieId === movie._id)
  );

  console.log("Today's movies are: ",todaymovie);
  console.log("Tomorrow's movies are: ",tomorrowmovie);
  // console.log("Filtered Tomorrow's movies are: ",filteredMoviesTomorrow);
  // console.log("Today's date is: ",formattedTime);

  return (
    <div className="text-white">
      <div className="relative bg-gradient-to-r from-red-900 via-black to-sky-800 ">
        {/* <div className="body relative z-10 transition-colors duration-300 ease-in-out delay-300">
            <img src="https://bigmovies.com.np/Modules/CineUploadFiles/Movie/HDImage/cover_573575.jpg" className='w-full h-60vh bg-cover' alt="hello" />   
          </div> */}
        <div className="relative overflow-hidden w-screen h-66vh z-1">
          <div
            className="absolute inset-0 bg-center animate-zoom w-full h-60vh w-full z-0"
            style={{
              backgroundImage: `url('https://bigmovies.com.np/Modules/CineUploadFiles/Movie/HDImage/cover_573575.jpg')`,
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }

        .animate-zoom {
          animation: zoom 8s ease-in-out infinite alternate;
        }
      `}</style>
      <div className="flex mx-40 flex-col mt-6">
        <div className="flex mt-10 mb-6">
          <h1 className="text-4xl font-md">Now Showing</h1>
          {/* <div className='allMovies flex gap-4 p-4 grid grid-cols-1 md:grid-cols-4 lg:gird-cols-4 '> */}
          <div className="mx-32 flex gap-2">
            <button
              onClick={showToday}
              className={`bg-gradient-to-t from-slate-800 via-slate-900 to-slate-900 w-24 shadow-4xl hover:text-red-700 font-bold ${
                buttonTodayClicked ? "text-red-700" : "text-white"
              }`}
            >
              Today
            </button>
            <button
              onClick={showTomorrow}
              className={`bg-gradient-to-t from-slate-800 via-slate-900 to-slate-900 w-24 shadow-3xl hover:text-red-700 font-semibold ${
                buttonTomorrowClicked ? "text-red-700" : "text-white"
              }`}
            >
              Tommorow
            </button>
          </div>
        </div>
        <div className="allMovies grid grid-cols-1 md:grid-cols-4">
          {aja && (
            <div className="flex gap-4">
              {filteredMoviesToday?.map((movie) => (
                <div key={movie._id}>
                  <MovieDetails movie={movie} movieShowtime={todaymovie} />
                </div>
              ))}
            </div>
          )}
          {!aja && (
            <div className="flex gap-4">
              {filteredMoviesTomorrow?.map((movie) => (
                <div key={movie._id}>
                  <MovieDetails movie={movie} movieShowtime={tomorrowmovie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next Release Section */}
      <div className="flex flex-col mt-6">
        <h1 className="text-4xl text-red-700 mx-64 mt-20 mb-6">Next Release</h1>
        <div className="allMovies flex mx-auto gap-4 p-4=">
          {movies?.map((movie) => (
            <div key={movie._id}>
              <NextRelease movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
