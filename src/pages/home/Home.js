import React, { useEffect, useState } from 'react'
import { CardBody, Card, Typography, Button } from '@material-tailwind/react';
import MovieDetails from './moviesDetails/MovieDetails';
import { getAllMovie, getAllShows } from '../../api-helpers/api-helper';
import {Link} from "react-router-dom"

const Home = () => {
  const [movies, setmovies] = useState([])
  const [showtimes, setShowtimes] = useState([])
  useEffect(() => {
    getAllMovie().then((data) => {
        setmovies(data.movies)
        getAllShows(data.movies[0]._id)
          .then((data)=>{
            // console.log("showtimes:", data.message)
            setShowtimes(data.message)
          })
        // console.log(data.movies[0]._id)
        // console.log(movies)
        // console.log(data.movies._id)
        // .then((data)=>{
        //   console.log(data)
        // })
    }).catch((err) => {
        console.log("message:", err)
    })
}, []);

  console.log(showtimes[0])
  
  return (
    <div className=''>
        <div className="relative">
          <div className="body relative">
            <img src="https://www.koimoi.com/wp-content/new-galleries/2023/04/this-is-the-reason-why-pushpa-2-the-rule-has-broken-out-and-become-a-grass-root-phenomenon-read-on-001.jpg" className='w-full bg-cover' alt="hello" />
            <div className="text absolute top-40 text-white ">
              <Card className="mt-6 w-96 mx-20 p-4 bg-slate-800 rounded-lg">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-white text-4xl rounded-xl">
                    Pushpa 2: The Rule
                  </Typography>
                  <Typography className='text-white'>
                    Set in the fictional dystopian city-state of Khansaar, the film follows the friendship between Deva
                    (Prabhas), a tribesman, and Varadha (Prithviraj), the prince of Khansaar.
                  </Typography>
                  <Button className='bg-black px-4 py-3 my-4 border border-white'><Link to='https://youtu.be/1VhA9aITCGg?feature=shared' target='_blank'>Watch Trailer</Link></Button>
                  <Button className='bg-yellow-400 mx-4 text-black px-4 py-3'>Buy Tickets</Button>
                  {/* <Button className='bg-yellow-400 px-4 py-2 my-4 mx-4 text-black'>Buy Tickets</Button> */}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        {/* <MovieDetails id={movies.id}/> */}

      <div className='flex flex-col mt-6 bg-gray-100'>
        <h1 className='text-5xl mx-auto my-4'>Now Showing</h1>
        <div className='allMovies flex mx-auto gap-4 p-4'>
          {movies?.map((movie) => (
            <MovieDetails key={movie._id} showtimes={showtimes} movie={movie} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home
