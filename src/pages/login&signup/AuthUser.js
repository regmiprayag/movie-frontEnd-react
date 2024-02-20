import React from 'react'
import {LoginUser} from "./LoginUser"
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { sendUserLoginRequest } from '../../api-helpers/api-helper'

export const AuthUser = () => {
    const dispatch = useDispatch()
    const onResReceived = (data)=>{
        console.log(data)
        dispatch(userActions.login())
        // const expiryTime = Date.now() + (1000*60*2) // expires after 2 minutes
        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("token", data.token)
        // localStorage.setItem("expiryTime" ,expiryTime)
    }
    const getData = async(data)=>{
        sendUserLoginRequest(data)
            .then(onResReceived)
            .catch(err=>console.log({message: "From AuthUser error ",err}))
    }
  return (
    <div>
       <LoginUser onSubmit={getData}/>
    </div>
  )
}
