import React, { useEffect, useRef, useState } from "react";
import { cancelTicket, getMovieById } from "../../api-helpers/api-helper";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const ConfirmationDialog = ({ message, reason, setReason, onCancel, onConfirm }) => {
console.log("The reasons is :",reason)
useEffect(()=>{
  localStorage.setItem("reason",reason);
},[reason])
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {message}
                </h3>
                <div className="mt-2">
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason for cancellation"
                    className="mt-1 p-2 text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onConfirm}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// console.log(reason)

const Tickets = ({ ticket, movieId }) => {
  const [movies, setMovies] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
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
    toast.error("Note: Only half payment will be done through cash")
    // console.log("Show reason for cancellation is: ",reason)
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmCancel = () => {
    setShowConfirmation(false); // Close confirmation dialog
    cancelTicket(ticket, cancellationReason)
      .then((res) => {
        console.log("Ticket cancellation response:", res);
        toast.success("Ticket cancelled successfully");
        // Perform any additional actions upon cancellation
      })
      .catch((error) => {
        console.error("Error cancelling ticket:", error);
        toast.error("Failed to cancel ticket");
      });
  };

  const handleDownload = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: "ticket",
  });

  const showCancelButton = (showDate, showtime) => {
    const showDateTime = new Date(`${showDate}T${showtime}`);
    const currentTime = new Date();
    return showDateTime > currentTime; // Show cancel button if the showtime is in the future
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-20">
        <div className="w-80 bg-[#182356] rounded-xl h-fit text-white p-4 mb-4">
          {movies && (
            <>
              <div
                ref={ticketRef}
                className="ticket-pdf p-4 bg-white text-black rounded-lg shadow-md"
              >
                {/* <h1 className="text-2xl font-bold mb-4">Movie Ticket</h1> */}
                <div className="text-lg text-red-700 mt-2">
                  Movie: {movies.title}
                </div>
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
                  <div className="flex gap-4">
                    <button
                      onClick={handleDownload}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Download
                    </button>
                    {/* {showCancelButton(ticket.showDate, ticket.showtime) && ( */}
                      <button
                        onClick={() => handleCancel(ticket)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300"
                      >
                        Cancel
                      </button>
                    {/* )} */}
                  </div>
                </div>
              </div>
              {showConfirmation && (
                <ConfirmationDialog
                  message="Are you sure you want to cancel this ticket?"
                  reason={cancellationReason}
                  setReason={setCancellationReason}
                  onCancel={() => setShowConfirmation(false)}
                  onConfirm={confirmCancel}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
