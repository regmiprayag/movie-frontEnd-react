import React from 'react'
import {
    Link
  } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
            <nav className="sm:px-20 bg-blue-300 sticky left-0 top-0 z-10 flex items-center justify-between px-4 py-2 text-white">
                <div>
                    <img src="https://bigmovies.com.np/Modules/Logo/image/Big%20Movies%20logo%20-%20Copy_736038.jpg" alt="bigmovies" />
                </div> 
                <div>
                    <ul className="flex gap-4">
                         <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/career">CAREER</Link>
                        </li>
                        <li>
                            <Link to="/contact">CONTACT</Link>
                        </li>
                        <li>
                            <Link to="/ticket">TICKET RATE</Link>
                        </li> 
                    </ul>
                </div>
                <div className="gap-5">
                    <Link to='/login/admin'><button className="bg-yellow-400 p-2 rounded-lg mx-4">Login Now</button></Link>
                    <Link to='/signup'><button className="bg-blue-400 p-2 rounded-lg">Register Now</button></Link>
                </div> 
            </nav>
        </div>
  )
}
