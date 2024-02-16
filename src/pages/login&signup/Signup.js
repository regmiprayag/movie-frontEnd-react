import React, {  useState } from 'react'
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom"

export const Signup = ({onSubmit}) => {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [success, setsuccess] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        onSubmit({name, email,password})
        setsuccess("Signup done sucessfully")
    }

  return (
    <div className='flex justify-center mt-10 text-white'>
    <Card color="transparent" shadow={false}>
  <Typography variant="h4" color="blue-gray" className='mx-auto text-3xl text-gray-200'>
    User Signup
  </Typography>
  <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold text-gray-200">
        Your Name
      </Typography>
      <Input
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        size="lg"
        placeholder="Full Name"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-lg p-2 "
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold text-gray-200">
        Your Email
      </Typography>
      <Input
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        size="lg"
        placeholder="name@mail.com"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-lg p-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold text-gray-200">
        Password
      </Typography>
      <Input
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
        type="password"
        size="lg"
        placeholder="********"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-lg p-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
    <button type='submit' className="bg-blue-400 p-2 w-96 mt-8 rounded-lg text-white">Signup Now</button>
    <Typography color="gray" className="mt-4 text-center font-normal text-gray-200">
      Already have an account?{" "}
      <Link to="/login/user" className="font-bold text-blue-400">
        Log In
      </Link>
    </Typography>
  </form>
  {success && <p>{success}</p>}
</Card>
  </div>
  )
}
