import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { createBooking, getMovieById, getShowtimeById, getUserById } from '../../api-helpers/api-helper';
import { useReactToPrint } from 'react-to-print';
import { QRCodeCanvas } from 'qrcode.react';

const TicketPDF = React.forwardRef(
  ({ movie, ticket, user }, ref) => {
    const qrValue = `${ticket.uuid}-${ticket.movieId}`;

    return (
      <div ref={ref} className="ticket-pdf p-4 bg-white text-black rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Movie Ticket</h1>
        <div className="text-sm text-gray-700 mt-2">Movie: {movie.title}</div>
        <div className="text-sm text-gray-700 mt-2">Show Date: {ticket.showDate}</div>
        <div className="text-sm text-gray-700 mt-2">
          Booked Seat: {ticket.selectedSeats.map((seat, index) => (
            <span key={index} className="mx-2">{seat}</span>
          ))}
        </div>
        <div className="text-sm text-gray-700 mt-2">Showtime: {ticket.showtime}</div>
        <div className="text-sm text-gray-700 mt-2">Name: {user.name}</div>
        <div className="text-sm text-gray-700 mt-2">
          <QRCodeCanvas value={qrValue} size={100} />
        </div>
      </div>
    );
  }
);

const Success = () => {
  const location = useLocation();
  const movieParams = useParams();
  const [ticket, setTicket] = useState({});
  const ticketRef = useRef(null);
  const [movie, setMovie] = useState({});
  const [user, setUser] = useState({});
  const [bookingCreated, setBookingCreated] = useState(false);

  useEffect(() => {
    if (!bookingCreated) {
      createBook();
    }
  }, []);

  const createBook = async () => {
    const showtimeId = sessionStorage.getItem('showtimeId');
    const movieId = movieParams.id;
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    const showtime = sessionStorage.getItem('showTime');
    const showDate = sessionStorage.getItem('showDate');
    const userId = localStorage.getItem('userId');
    const uuid = sessionStorage.getItem('uuid');

    try {
      const res = await createBooking(selectedSeats, movieId, showtimeId, showtime, showDate, userId, uuid);
      setTicket(res.tickets);

      const movieRes = await getMovieById(res.tickets.movieId);
      setMovie(movieRes.movies);

      const userRes = await getUserById(userId);
      setUser(userRes.users);

      setBookingCreated(true);
      sessionStorage.removeItem("selectedSeats");
      sessionStorage.removeItem("value");
      sessionStorage.removeItem("showtimeId");
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  const handleDownload = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: "ticket",
  });

  useEffect(() => {
    console.log("The value in tickets are: ", ticket);
  }, [ticket]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {bookingCreated && (
        <div className="bg-white gap-4 rounded w-80 flex flex-col p-5 justify-center items-center">
          <div className="w-full border-2 border-gray-500 border-dashed p-4 h-auto">
            <TicketPDF ref={ticketRef} movie={movie} ticket={ticket} user={user} />
          </div>
          <div>
            <button onClick={handleDownload} className="text-gray-900 px-3 text-sm py-1.5 rounded bg-blue-200 hover:bg-blue-400 transition">
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
