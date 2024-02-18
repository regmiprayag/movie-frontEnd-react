import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllShows } from '../../../api-helpers/api-helper';

const MovieDetails = ({ movie }) => {
  const [showtimes, setShowtimes] = useState([]);

  const navigate = useNavigate();
  
  const loadData = async () => {
    await getAllShows(movie._id)
            .then((data)=>{
              // console.log(data);
              setShowtimes(data);
            }).catch(err => console.log(err));
  }
  useEffect(() => {
    loadData();
  }, [])

  const handleClick = (id) => {
    // console.log(id);
    navigate(`/booking/${movie._id}`, {state: {id}});
    // console.log(showtimes);
  }
  
  return (
    <div className='max-w-sm border border-blue p-3 w-full bg-gray-800 rounded-md gap-4 shadow-2xl'>
      <img src={`http://localhost:8000/images/${movie.posterUrl}`} className='h-80 w-64 rounded-xl' alt='dummy' />
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {/* {movie && movie.description} */}
      </p>
      <div className='mt-4 mx-2'>
        <div className="text-2xl">
          {movie && movie.title}
        </div>
        <div className="text-sm text-gray-400">
          2 Hours
        </div>
        <div className="text-sm text-gray-400">
          Drama, Action
        </div>
        <div className=''>
          {/* {
            showtimes.map(showtime => (
              <Link to={`/booking/${movie._id}`}><button className='border border-white p-1 w-20 mt-4 mr-2 rounded-md text-white mb-1'>{showtimes[0].showTime}</button></Link>
              //  <Link to={`/booking/${movie._id}`}><button className='border border-white p-1 w-20 mt-4 mr-2 rounded-md text-white mb-1'>{new Date(showtime.startTime).getHours()}:{new Date(showtime.startTime).getMinutes()} AM</button></Link>
            ))
          } */}
          {showtimes
                    .filter(showtime => showtime.movieId === movie._id)
                    .map(showtime => (
                        // <Link key={showtime._id} to={`/booking/${movie._id}`}>
                        //     <button className="border border-white p-1 w-20 mt-4 mr-2 rounded-md text-white mb-1">
                        //         {showtime.showTime}
                        //     </button>
                        // </Link>
                        <button onClick={() => handleClick(showtime._id)} className="border border-white p-1 w-20 mt-4 mr-2 rounded-md text-white mb-1">
                              {showtime.showTime}
                        </button>
                    ))
          }
        </div>
      </div>
    </div>
  )
}

export default MovieDetails