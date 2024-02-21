import React, { useEffect, useState } from 'react'
import MovieDetails from './moviesDetails/MovieDetails';
import { getAllMovie } from '../../api-helpers/api-helper';

const Home = () => {
  const [movies, setmovies] = useState([])
  useEffect(() => {
    getAllMovie().then((data) => {
        setmovies(data.movies)
    }).catch((err) => {
        console.log("messag:", err)
    })
}, []);
  
  return (
    <div className='text-white'>
        <div className="relative">
          <div className="body relative z-10 transition-colors duration-300 ease-in-out delay-300">
            <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjB0aGVhdGVyfGVufDB8fDB8fHww" className='w-full h-lvh bg-cover' alt="hello" />   
          </div>
        </div>
        {/* <div className="relative w-screen h-screen overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat min-h-full animate-zoom" style={{ backgroundImage: `url('https://www.koimoi.com/wp-content/new-galleries/2023/04/this-is-the-reason-why-pushpa-2-the-rule-has-broken-out-and-become-a-grass-root-phenomenon-read-on-001.jpg')` }}></div>
        </div> */}

        {/* <style jsx>{`
          @keyframes zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
          }

          .animate-zoom {
            animation: zoom 4s ease-in-out infinite alternate;
          }
        `}</style> */}
      <div className='flex flex-col mt-6'>
        <h1 className='text-5xl mx-auto my-4'>Now Showing</h1>
        <div className='allMovies flex mx-auto gap-4 p-4'>
          {movies?.map((movie) => (
            <div key={movie._id}>
            <MovieDetails movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
