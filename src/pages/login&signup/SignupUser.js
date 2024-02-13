import React from 'react'
import { Signup } from './Signup';
import { sendAuthSignupRequest } from '../../api-helpers/api-helper';

export const SignupUser = () => {
    const getData = (data)=>{
        sendAuthSignupRequest(data).then((res)=>{
            console.log(res)
        }).catch(err=>console.log(err))
    }
  return (
    <div>
        <Signup onSubmit={getData}/>
  </div>
  )
}
