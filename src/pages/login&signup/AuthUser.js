import React from 'react'
import {LoginUser} from "./LoginUser"
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { sendUserLoginRequest } from '../../api-helpers/api-helper'

export const AuthUser = () => {
    const dispatch = useDispatch()
    const onResReceived = (data)=>{
        dispatch(userActions.login())
        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("token", data.token)
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
