import React from 'react';

const TicketRates = () => {
    // Define static showtime prices
    const showtimePrices = [
        { day: 'Monday-Thursday', time: 'Morning (12:00 AM - 10:00 AM)', price: '100' },
        { day: 'Monday-Thursday', time: 'Day Show (10:01 AM - 8:00 PM)', price: '200' },
        { day: 'Monday-Thursday', time: 'Late Night (8:01 PM - 12:00 AM)', price: '150' },
        { day: 'Friday-Sunday', time: 'Morning (12:00 AM - 10:00 AM)', price: '150' },
        { day: 'Friday-Sunday', time: 'Day Show (10:01 AM - 8:00 PM)', price: '300' },
        { day: 'Friday-Sunday', time: 'Late Night (8:01 PM - 12:00 AM)', price: '200' },


        // Morning show (10:00 AM - 8:00 PM)
        // price = '200';
    ];

    return (
        <div className="py-4 mx-12">
            <h1 className="text-3xl font-bold mb-4 mx-auto text-white">Showtimes Pricing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Monday - Thursday</h2>
                    {showtimePrices.filter(showtime => showtime.day === 'Monday-Thursday').map((showtime, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <p className="text-lg">Time: {showtime.time}</p>
                            <p className="text-lg text-red-900 font-normal">Price: <span className='text-red-900 font-normal'>Rs. </span>{showtime.price}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Friday - Sunday</h2>
                    {showtimePrices.filter(showtime => showtime.day === 'Friday-Sunday').map((showtime, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <p className="text-lg">Time: {showtime.time}</p>
                            <p className="text-lg text-red-900 font-normal">Price: <span className='text-red-900 font-normal'>Rs. </span>{showtime.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketRates;
