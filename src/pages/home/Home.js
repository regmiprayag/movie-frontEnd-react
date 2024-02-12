import React, { useEffect, useState } from 'react'
import { CardBody, Card, Typography, Button } from '@material-tailwind/react';
import MovieDetails from './moviesDetails/MovieDetails';
import { getAllMovie } from '../../api-helpers/api-helper';
import {Link} from "react-router-dom"

const Home = () => {
  const [movies, setmovies] = useState([])

  useEffect(() => {
    getAllMovie().then((data) => {
        setmovies(data.movies)
        // console.log(movies)
    }).catch((err) => {
        console.log("message:", err)
    // console.log(movies)
    })
}, [])
  useEffect(()=>{
    // console.log("Updated movie:",movies)
    // console.log("Movie id: ",movi)
  },[movies])
  return (
    <div className=''>
        <div className="relative">
          <div className="body relative">
            <img src="https://www.koimoi.com/wp-content/new-galleries/2023/04/this-is-the-reason-why-pushpa-2-the-rule-has-broken-out-and-become-a-grass-root-phenomenon-read-on-001.jpg" className='w-full bg-cover' alt="hello" />
            <div className="text absolute top-40 text-white ">
              <Card className="mt-6 w-96 mx-20 p-4 bg-slate-800 rounded-lg">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-white text-6xl">
                    Salaar
                  </Typography>
                  <Typography className='text-white'>
                    Set in the fictional dystopian city-state of Khansaar, the film follows the friendship between Deva
                    (Prabhas), a tribesman, and Varadha (Prithviraj), the prince of Khansaar.
                  </Typography>
                  <Button className='bg-black px-4 py-3 my-4 border border-white'><Link to='https://youtu.be/Pr2jBvbiy04?feature=shared' target='_blank'>Watch Trailer</Link></Button>
                  <Button className='bg-yellow-400 text-black px-4 py-3'>Buy Tickets</Button>
                  {/* <Button className='bg-yellow-400 px-4 py-2 my-4 mx-4 text-black'>Buy Tickets</Button> */}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        {/* <MovieDetails id={movies.id}/> */}

      <div className='flex flex-col m-6'>
        <h1 className='text-5xl mx-auto my-4'>Now Showing</h1>
        <div className='allMovies flex mx-auto gap-4 p-4'>
          {movies && movies.map((movies, item) => {
            return <MovieDetails id={movies.id} title={movies.title} description={movies.description} key={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
