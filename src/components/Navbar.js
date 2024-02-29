import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import {
//     Card,
//     Typography
//   } from "@material-tailwind/react";

export const Navbar = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleClick = async () => {
    dispatch(userActions.logout(false));
    toast.success("Logout Successfull");
  };
// bg-gradient-to-r from-slate-900 via-black to-sky-800
  return (
    <div className="top-0 left-0 right-0 z-40">
        <nav className="top-0 bg-gradient-to-l from-sky-900 via-black bg-opacity-25 transparent left-0 right-0 flex items-center justify-between px-4 py-2 text-white sm:px-20">
            <div className="mx-20">
                <img
                    src="https://bigmovies.com.np/Modules/Logo/image/Big%20Movies%20logo%20-%20Copy_736038.jpg"
                    alt="bigmovies"
                />
            </div>
            <div>
                <ul className="flex gap-12">
                    <li className="hover:text-red-400">
                        <Link to="/">HOME</Link>
                    </li>
                    <li className="hover:text-red-400">
                        <Link to="/career">CAREER</Link>
                    </li>
                    <li className="hover:text-red-400">
                        <Link to="/contact">CONTACT</Link>
                    </li>
                    <li className="hover:text-red-400">
                        <Link to="/ticket">TICKET RATE</Link>
                    </li>
                    {isUserLoggedIn && (
                        <div>
                            <ul className="flex gap-4">
                                <li className="hover:text-red-400">
                                    <Link to="/booking">BOOKING</Link>
                                </li>
                                <li className="hover:text-red-400">
                                    <Link to="/ticket">MY TICKET</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
            <div className="gap-5 mx-12">
                {!isUserLoggedIn && (
                    <>
                        <Link to="/login/user">
                            <button className="bg-yellow-500 text-black text-lg mx-2 px-3 py-2 rounded-lg hover:bg-yellow-600">
                                Login Now
                            </button>
                        </Link>
                        <Link to="/signup/user">
                            <button className="bg-blue-400 text-white text-lg mx-2 px-6 py-2 rounded-lg hover:bg-blue-800">Signup</button>
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
  );
};
