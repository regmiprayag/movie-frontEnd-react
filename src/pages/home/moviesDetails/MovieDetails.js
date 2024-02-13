import React from 'react'
import { Link } from 'react-router-dom'

const MovieDetails = ({movie}) => {
  // const navigate = useNavigate()
  // console.log(movie);
  const handleClick = async()=>{
      
  }
  return (
    <div className='max-w-sm border border-gray-400 p-3 rounded-md shadow-lg'>
          <img className='rounded-md' src='https://www.koimoi.com/wp-content/new-galleries/2023/04/this-is-the-reason-why-pushpa-2-the-rule-has-broken-out-and-become-a-grass-root-phenomenon-read-on-001.jpg' alt='movies' />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {movie && movie.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {movie && movie.description}
          </p>
          <Link to={`/booking/${movie._id}`} className='w-96'><button onClick={handleClick} className='bg-blue-400 text-white w-full rounded-lg p-2'>Book Now</button></Link>
    </div>
  )
}

export default MovieDetails