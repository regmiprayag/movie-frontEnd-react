import React,{useEffect,useState} from 'react'
import { getAllMovie } from '../../../api-helpers/api-helper'
import MovieDetails from '../../home/moviesDetails/MovieDetails'

export const Movies = () => {
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
    <div>
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
