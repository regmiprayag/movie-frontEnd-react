import axios from "axios";
import { toast } from "react-toastify";

export const getAllMovie = async() => {
    const res = await axios
        .get("http://localhost:8000/movies")
        .catch((err) => {
            console.log(err)
        })
    if (res.status !== 200) {
        return console.log("No data")
    }

    const data = await res.data;
    // console.log(data)
    return data;
}

export const getSeats = async (id) => {
    const res = await axios.get(`http://localhost:8000/common/getSeats/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch(err => console.log(err));
    // console.log(res.data)
    const data = await res.data;
    return data;
}

// creating an order in esewa.
export const  createOrderEsewa = async (data) => {
    const res = await axios.post(`http://localhost:8000/booking/createOrder`,{data},{
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    })
    // console.log("aayo shai sabai thk",res)
    const resData = await res.data
    return resData
}

export const createBooking = async(seatNumber,movieId,showtimeId,showtime,showDate,userId,uuid)=>{
    console.log("Inside createBooking api",seatNumber,movieId,showtimeId,showtime,uuid);
    console.log("The movieId in api-helper is: ",movieId)
    const formData = {
        seatNumber,
        showtimeId,
        movieId,
        showtime,
        showDate,
        userId,
        uuid,
    }
    const res = await axios.post(`http://localhost:8000/booking/${movieId}/create`, formData, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch(err=>console.log("Hyaa ho k error",err))
    console.log("Aayo hai response ta yarr",res);
    const resData = res.data;
    toast.success(resData.message);
    return resData;
}

//Getting all Seat of the movie
export const getAllShows = async(id)=>{
    const res = await axios
        .get(`http://localhost:8000/showtimes/${id}`)
        .catch((err)=>{
            console.log(err)
    })

    const data = await res.data.message
    return data;
}

// Fetching the showdate for Now.
export const getAllShowsToday = async()=>{
    // console.log("Today date in api is: ");
    const res = await axios.get("http://localhost:8000/showtimesToday").catch(err=>console.log("Showtoday error ho hai ",err))

    const resData = await res.data;
    return resData;    
}

export const getAllShowsTomorrow = async()=>{
    const res = await axios.get("http://localhost:8000/showtimesTommorow").catch(err=>console.log("Tomorrow ko error ho hai ",err))
    const resData = await res.data;

    // console.log("From api tomorrow movies are: ",resData.showtime);
    return resData;    
}


export const sendUserLoginRequest = async(data)=>{
    const res = await axios.post("http://localhost:8000/login/user",{
        email: data.email,
        password: data.password
    }).catch((err)=>{
        toast.error(err.response.data.message);
        // throw err
    })
    
    const resData = await res.data
    return resData
}

export const getMovieById = async(movieId)=>{
    const res = await axios.get(`http://localhost:8000/movies/${movieId}`)
        .catch((err)=>{
            console.log(err);
        })
    // console.log("GetMovieById detail: ",res);
    const resData = res.data;
    return resData;
}

export const getShowtimeById = async(showtimeId)=>{
    const res = await axios.get(`http://localhost:8000/showtimeById/${showtimeId}`)
        .catch((err)=>{
            console.log(err);
        })
    // console.log("Shotime details are detail: ",res);
    const resData = res.data;
    return resData;
}

export const getUserById = async(userId)=>{
    const res = await axios.get(`http://localhost:8000/users/${userId}`)
        .catch((err)=>{
            console.log(err);
        })
    // console.log("Users details are detail: ",res);
    const resData = res.data;
    return resData;
}

export const userDetails = async () => {
    const res = await axios.get('http://localhost:8000/common/user/details', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    })
    const data = await res.data;
    return data;
};

export const sendAuthSignupRequest = async(data)=>{
    // return data
    const res = await axios.post("/signup/user",{
        name: data.name,
        email: data.email,
        password: data.password
    }).catch((err)=>{
        console.log({mess:"hyaa error ho hai",err})
    })
    const resData = await res.data
    return resData
}

export const getMovieDetails  = async(id)=>{
    const res = await axios.get(`http://localhost:8000/common/movies/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch((err)=>{console.log(err)})
    const data = await res.data;
    return data;
}

// getting booking of a particular user
export const getBookingsByUser = async(id)=>{
    // console.log("The user id is: ",id);
    const res = await axios.get(`http://localhost:8000/bookings/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch((err)=>{console.log(err)})
    console.log("The details from froentEnd api are: ",res)
    return;
    const data = await res.data;
    return data;
}

export const getTickets = async(id)=>{
    const res = await axios.get(`http://localhost:8000/common/tickets/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch(err=>{console.log(err)})
    // console.log("Hello response from api of getTickets are: ",res.data);
    const resData = await res.data;
    return resData;
} 