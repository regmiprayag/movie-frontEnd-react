import React from 'react'
import { Link } from 'react-router-dom'

const MovieDetails = ({movie}) => {
  // const navigate = useNavigate()
  // console.log(movie);
  const handleClick = async()=>{
      
  }
  return (
    <div className='max-w-sm border border-gray-400 p-3 w-full rounded-md shadow-lg'>
          {/* <img className='rounded-md' src={`http://localhost:8000/images/${movie.posterUrl}`} alt='movies' /> */}
          <img src={`http://localhost:8000/images/${movie.posterUrl}`} className='h-60 w-60' alt='dummy' />

          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {movie && movie.title}
              {/* {movie.posterUrl} */}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {movie && movie.description}
          </p>
          <Link to={`/booking/${movie._id}`} className='w-96'><button onClick={handleClick} className='bg-blue-400 text-white w-full rounded-lg p-2'>Book Now</button></Link>
    </div>
  )
}

export default MovieDetails