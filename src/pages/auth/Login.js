import React, { useEffect, useState } from 'react'
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from "axios"
 
export const Login = () => {
    // const [admin, setAdmin] = useState([])
    // useEffect(()=>{
    //     loginAdmin().then((data)=>{
    //         setAdmin(data.admin)
    //         console.log(data)
    //     }).catch((err)=>{
    //         console.log("message: ",err)
    //     })
    // },[])
  //   useEffect(() => {
  //     loginUser().then((data) => {
  //           setUser(data.user)
  //       }).catch((err) => {
  //           console.log("message:", err)
  //       })
  //   }, [])
  // const dummyEmail = "nayak@gmail.com"
  // const dummyPassword = "nayak123"
    // const [inputs,setInputs] = useState({
    //     name:"",
    //     password:"",
    // })
    // const handleChange = (e)=>{
    //     setInputs((prevState)=>({
    //         ...prevState,
    //         [e.target.name] : e.target.value
    //     }))
    // }
    // const handleSubmit = (e)=>{
    //     // e.preventDefault()
    // }

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const res = await axios.post("http://localhost:8000/login/admin",{email,password})
            const {token} = res.data
            console.log({token, email,password})
            navigate("/dashboard")
        }catch(err){
            setError("Invalid email or password")
        }
        
    }

  return (
      <div className='flex justify-center mt-10'>
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className='mx-auto text-3xl'>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold">
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
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-bold">
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
        <button type='submit' className="bg-blue-400 p-2 w-96 mt-8 rounded-lg text-white">Login Now</button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="#" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
      {error && <p>{error}</p>}
    </Card>
      </div>
  )
}

