import React, { useState } from 'react'
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
 
export const LoginUser = ({onSubmit}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        onSubmit({email,password})
        try{
          // toast.success("Login Succesfull")
          navigate('/');
        }catch(err){
            toast.error("Invalid email or password")
        }
    }


    
  return (
      <div className='flex justify-center mt-10 text-white'>
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className='mx-auto text-4xl text-white'>
       User Login
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 bg-blue-900 text-white p-6 max-w-screen-lg rounded-2xl sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold">
            Your Email
          </Typography>
          <Input
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            size="lg"
            placeholder="name@mail.com"
            className="rounded-lg p-2 text-white"
           
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold">
            Password
          </Typography>
          <Input
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-lg p-2 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <button type='submit' className="bg-blue-400 p-2 w-80 mt-8 rounded-lg text-white">Login Now</button>
        <Typography color="gray" className="mt-4 text-center font-normal text-white">
          Not have an account?{" "}
          <Link to="/signup/user" className="font-medium text-blue-400">
            SignUp Now
          </Link>
        </Typography>
      </form>
      {error && <p>{error}</p>}
    </Card>
      </div>
  )
}

