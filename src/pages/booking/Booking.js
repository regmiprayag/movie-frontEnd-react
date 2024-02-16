import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getMovieDetails } from "../../api-helper/api-helper";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getMovieDetails } from "../../api-helpers/api-helper";

export const Booking = () => {
  const [movie, setMovies] = useState({});
  const id = useParams().id;
  // console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovies(res.movies);
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  return (
    <div className="text-white">
      <Typography variant="h1" color="blue-gray" className="mb-2 m-8 flex justify-center">
        Book Tickts for {movie.title}
      </Typography>
    <div className="mx-40 flex gap-40">
      <Card className="mt-6 w-96 p-2 border-2">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={`http://localhost:8000/images/${movie.posterUrl}`}
            className="w-full rounded-2xl"
            alt="card-image"
          />
        </CardHeader>
        
        <CardBody>
          <Typography variant="h2" color="blue-gray" className="mb-2 m-4 text-3xl">
            {movie.title}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Description: {movie.description}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Release Date: {new Date(movie.releaseDate).toDateString()}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Actors: {movie.actors}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* <Button className="bg-black w-full">Read More</Button> */}
        </CardFooter>
      </Card>
      <div className="mt-6 border border-white">
        <Typography variant="h3" color="blue-gray" className="mb-2 m-8 flex justify-center">
          Select Seats
        </Typography>
        
      </div>
    </div>
    </div>
  );
};
