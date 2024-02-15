import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store";
import { useDispatch } from "react-redux";
// import {
//     Card,
//     Typography
//   } from "@material-tailwind/react";

export const Navbar = () => {
    const dispatch = useDispatch();

    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    
    const handleClick = async () => {
        dispatch(userActions.logout(false));
    };
    return (
        <div className="">
            {/* <nav className="sticky top-0 left-0"> */}
            <nav className=" bg-blue-300 sticky top-0 left-0 z-10 flex items-center justify-between px-4 py-2 text-white sm:px-20">
                <div>
                    <img
                        src="https://bigmovies.com.np/Modules/Logo/image/Big%20Movies%20logo%20-%20Copy_736038.jpg"
                        alt="bigmovies"
                    />
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
                        {isUserLoggedIn && (
                            <div>
                                <ul className="flex gap-4">
                                    <li>
                                        <Link to="/booking">BOOKING</Link>
                                    </li>
                                    <li>
                                        <Link to="/ticket">MY TICKET</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="gap-5">
                    {!isUserLoggedIn && (
                        <>
                            <Link to="/login/user">
                                <button className="bg-yellow-400 mx-4 p-2 rounded-lg">
                                    Login Now
                                </button>
                            </Link>
                            <Link to="/signup/user">
                                <button className="bg-blue-400 p-2 rounded-lg">Signup</button>
                            </Link>
                        </>
                    )}
                    {isUserLoggedIn && (
                        <div className="">
                            {/* <Card color="transparent" shadow={false}>
                                <Typography variant="h4" color="blue-gray" className='mx-auto text-3xl'>
                                </Typography>
                            </Card> */}
                            <Link to="/">
                                <button
                                    onClick={handleClick}
                                    className="bg-red-400 mx-4 p-2 rounded-lg"
                                >
                                    Logout Now
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}
