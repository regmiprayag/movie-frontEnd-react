import React, { useEffect } from 'react'
import {LoginUser} from "./LoginUser"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { sendUserLoginRequest } from '../../api-helpers/api-helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AuthUser = () => {
    const dispatch = useDispatch()

    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if(!isUserLoggedIn) {
        navigate('/login/user');
        return
      }
    }, []);
    
    const onResReceived = (data)=>{
        console.log(data)
        dispatch(userActions.login())
        // const expiryTime = Date.now() + (1000*60*2) // expires after 2 minutes
        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("token", data.token)
        toast.success("Login now Succesfull")
        // localStorage.setItem("expiryTime" ,expiryTime)
    }
    const getData = async(data)=>{
        sendUserLoginRequest(data)
            .then(res => onResReceived(res))
            .catch(err=>toast.error({message: "Login Failed",err}))
    }
  return (
    <div>
       <LoginUser onSubmit={getData}/>
    </div>
  )
}
