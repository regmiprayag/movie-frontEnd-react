import React from 'react'
import {
    Link
} from "react-router-dom"

export const Footer = () => {
  return (
    <div className="mt-20 bg-blue-400">
    <footer className="flex justify-between">
        <div className="first-col">
            <span>
                <img className="h-14 mt-4" src="https://bigmovies.com.np/Upload/images/Big%20Movies%20logo.jpg" alt="" />
            </span>
            <div className="flex gap-4 mt-16">
                <img className="h-10 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="" />
                <img className="h-10 cursor-pointer" src="https://image.similarpng.com/very-thumbnail/2020/06/Instagram-logo-transparent-PNG.png" alt="" />
                <img className="h-10 cursor-pointer" src="https://i.pinimg.com/originals/0d/9c/24/0d9c24b21e25f1ecd9f69026f692322e.png" alt="" />
            </div>
        </div>
        <div className="second-col mt-6">
            <h1 className="text-xl text-gray-300">QUICKLINKS</h1>
            <div className="mt-4 gap-4 flex">
                <ul className="">
                    <li><Link to="">Home</Link></li>
                    <li className="mt-4"><Link to="">About Us</Link></li>
                    <li className="mt-4"><Link to="">Moments</Link></li>
                    <li className="mt-4"><Link to="">Ticket Rate</Link></li>
                    <li className="mt-4 mb-20"><Link to="">Contact</Link></li>
                </ul>
            </div>
        </div>
        <div className="third-col mt-6">
            <h1 className="text-xl text-gray-300">PAYMENT PARTNER</h1>
            <img className="h-20" src="https://bigmovies.com.np/Modules/SageFlick/PaymentMethod/images/e_sewa.png" alt="" />
        </div>
        <div className="last mt-4 mt-6">
            <h1 className="text-3xl">For Booking</h1>
            <h1 className="">For Marketing and Enquiries:</h1>
            <h1 className="">Email: hr@bigmovies.com.np</h1>

            <h1 className="mt-6">For Complains and Support:</h1>
            <h1 className="">Email: parlesh@bigmovies.com.np</h1>
        </div>
    </footer>
</div>
  )
}
