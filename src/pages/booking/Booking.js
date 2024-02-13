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
  const [movie, setmovie] = useState("");
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setmovie(res.allmovies);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(movie);
  return (
    <div className="">
      <Typography variant="h1" color="blue-gray" className="mb-2 m-8 flex justify-center">
        Book Tickts for {movie.title}
      </Typography>
      <Card className="mt-6 w-96 p-2 border-2">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://studybizz.com/film/wp-content/uploads/2023/12/images-65.jpeg"
            className="w-dvh"
            alt="card-image"
          />
        </CardHeader>
        
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 m-4">
            {movie.title}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Description: {movie.description}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Release Date: {movie.releaseDate}
          </Typography>
          <Typography className=" mx-4 mt-4">
            Actors: {movie.actors}
          </Typography>
        </CardBody>

        <CardFooter className="pt-0">
          <Button className="bg-black w-full">Read More</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
