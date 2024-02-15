import React,{ useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import {
  Routes,
  Route
} from "react-router-dom";
import * as pages from '../pages';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';
import PrivateRoute from './PrivateRoute';

export const AllRoutes = () => {
  const dispatch = useDispatch()

  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  console.log("Is Logged logged in: ", isUserLoggedIn)

  useEffect(()=>{
      if(localStorage.getItem("userId")){
          dispatch(userActions.login())
      }
  },[dispatch])

  return (
    <div>
      <div>
        <Navbar className=""/>
        <Routes>
          <Route path='/' element={<pages.home.Home/>}/>
          {/* <Route path='/login/admin' element={<pages.auth.Login/>}/> */}
          <Route path='/login/user' element={<pages.auth.AuthUser/>}/>
          <Route path='/signup/user' element={<pages.auth.SignupUser/>}/>
          {/* <Route path='/dashboard' element={<pages.dashboard.Dashboard/>}/> */}
          <Route path='/booking/:id' element={<PrivateRoute element={<pages.booking.Booking/>} />}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
