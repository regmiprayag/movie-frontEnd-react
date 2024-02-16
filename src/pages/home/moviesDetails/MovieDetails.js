import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const MovieDetails = ({ movie, showtimes }) => {
  // const navigate = useNavigate()
  // console.log(movie);
  const handleClick = async () => {

  }
  useEffect(() => {
    if (showtimes.length > 0 && showtimes[0] !== undefined) {
      console.log("all showtimnes: ", showtimes[0].movieId)
    }
  }, [showtimes])

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
                        <Link key={showtime._id} to={`/booking/${movie._id}`}>
                            <button className="border border-white p-1 w-20 mt-4 mr-2 rounded-md text-white mb-1">
                                {showtime.showTime}
                            </button>
                        </Link>
                    ))
                }
        </div>
      </div>
    </div>
  )
}

export default MovieDetails