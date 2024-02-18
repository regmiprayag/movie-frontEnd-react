import React, { useEffect, useState } from 'react'
import { CardBody, Card, Typography, Button } from '@material-tailwind/react';
import MovieDetails from './moviesDetails/MovieDetails';
import { getAllMovie, getAllShows } from '../../api-helpers/api-helper';
import {Link} from "react-router-dom"

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
          <div className="body relative z-10 transition duration-150 ease-in-out">
            <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjB0aGVhdGVyfGVufDB8fDB8fHww" className='w-full h-lvh bg-cover' alt="hello" />
            
          </div>
        </div>
        {/* <MovieDetails id={movies.id}/> */}
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
