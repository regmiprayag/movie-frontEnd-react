import React,{useEffect, useState} from 'react'
import { createBooking } from '../../api-helpers/api-helper'
import { useParams, useLocation } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

export const FinalBooking = () => {
    const [tickets, setTickets] = useState({})
    const [movies,setMovies] = useState({})
    const [showtime,setShowtime] = useState({})
    const location = useLocation();
    const movieId = useParams();

    const loadData = ()=>{
        createBooking(location.state.selectedSeats,movieId,location.state.showtimeId).then((res)=>{
            setTickets(res)
        }).catch(err=>console.log(err))
    }
    useEffect(()=>{
       loadData()
    },[])

    useEffect(()=>{
        console.log("tickets ho hai", tickets);
    },[tickets])
  return (
    <div className='text-black flex flex-col p-4 mx-20'>
        <Card className="mt-6 w-96 mx-auto">
        <CardHeader color="blue-gray" className="relative">
        <img
          src="https://media.istockphoto.com/id/828088276/ko/%EB%B2%A1%ED%84%B0/qr-%EC%BD%94%EB%93%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=612x612&w=0&k=20&c=staiAdfjiUsHGXJwqoeZ6-A8mYR-x885N_FYlO64MfE="
          alt="qr-image" className='h-28 w-40'
        />
      </CardHeader>
      <CardBody className='m-10'>
        <Typography variant="h5" color="blue-gray" className="mb-2 p-4 text-black">
            Movie: 
        </Typography>
        <Typography className='m-10'>
            Showtime:
        </Typography>
      </CardBody>
      <CardFooter className='m-10'>
        <Button>Download Now</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
