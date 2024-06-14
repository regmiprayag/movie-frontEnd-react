import React, { useEffect, useRef, useState } from "react";
import { getMovieById } from "../../api-helpers/api-helper";
import { useReactToPrint } from "react-to-print";

const TicketPDF = React.forwardRef(
  ({ movies, ticket, showCancelButton, handleCancel, handleDownload, handleDelete }, ref) => {
    return (
      <div
        ref={ref}
        className="ticket-pdf p-4 bg-white text-black rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Movie Ticket</h1>
        <div className="text-sm text-gray-700 mt-2">Movie: {movies.title}</div>
        <div className="text-sm text-gray-700 mt-2">
          Show Date: {ticket.showDate}
        </div>
        <div className="text-sm text-gray-700 mt-2">
          Booked Seat:{" "}
          {ticket.selectedSeats.map((seat, index) => (
            <span key={index} className="mx-2">
              {seat}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-700 mt-2">
          Showtime: {ticket.showtime}
        </div>
        <div className="text-sm text-gray-700 mt-2">
          Status:
          <span
            className={`px-2 rounded-xl ${
              ticket.status === "Updated"
                ? "bg-red-600 text-white p-1 m-2"
                : "bg-green-600 text-white"
            }`}
          >
            {ticket.status}
          </span>
        </div>
        <div className="mt-4">
          {showCancelButton(ticket.showtime) && (
            <button
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300"
            >
              Cancel
            </button>
          )}
          <div className="flex">
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Download
            </button>
            <button
              onClick={handleCancel(ticket)}
              className="mx-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const Tickets = ({ ticket, movieId }) => {
  const [movies, setMovies] = useState(null);
  const ticketRef = useRef(null);

  const loadData = async () => {
    try {
      const res = await getMovieById(movieId);
      console.log("Movies details are: ", res.movies.title);
      setMovies(res.movies);
    } catch (error) {
      console.error("Failed to load movie data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [movieId]);

  const handleCancel = (ticket) => {
    console.log("Ticket id is: ",ticket);
  };

  const handleDelete = () => {
    console.log("Ticket deletre");
    // Add your cancellation logic here
  };


  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: "ticket",
  });

  const showCancelButton = (showtime) => {
    const showDateTime = new Date(`${ticket.showDate}T${showtime}`);
    const currentTime = new Date();
    const timeDifference = (showDateTime - currentTime) / (1000 * 60 * 60); // Time difference in hours

    return timeDifference >= 2; // Show cancel button if the showtime is at least 2 hours away
  };

  const isUpcoming = (showtime) => {
    const showDateTime = new Date(`${ticket.showDate}T${showtime}`);
    const currentTime = new Date();

    return showDateTime > currentTime;
  };

  return (
    <div className="p-4">
      {/* <div className="text-2xl font-bold text-white mb-4">Tickets</div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-20">
        {/* <h2 className="text-xl font-semibold mb-2 text-white">Expired Tickets</h2> */}
        <div>
          {!isUpcoming(ticket.showtime) && (
            <div className="w-80 bg-[#182356] rounded-xl h-fit text-white p-4 mb-4">
              {movies && (
                <TicketPDF
                  ref={ticketRef}
                  movies={movies}
                  ticket={ticket}
                  showCancelButton={showCancelButton}
                  handleCancel={handleCancel}
                  handleDownload={handlePrint}
                  />
                  )}
                  {/* <div>hello</div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
