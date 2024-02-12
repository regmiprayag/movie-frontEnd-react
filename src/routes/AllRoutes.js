import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as pages from '../pages';

export const AllRoutes = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<pages.home.Home/>}/>
          <Route path='/login/admin' element={<pages.auth.Login/>}/>
          <Route path='/dashboard' element={<pages.dashboard.Dashboard/>}/>
          
        </Routes>
        <Footer />
      </div>
      {/* <div>
        <Navbar/>
        <Routes>
        </Routes>
       </div> */}
    </div>
  )
}
