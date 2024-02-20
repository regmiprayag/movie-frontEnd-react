import axios from "axios";

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
    const res = await axios.post(`http://localhost:8000/bookings/createOrder`,{data},{
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    })
    // console.log("aayo shai sabai thk",res)
    const resData = await res.data
    return resData
}

export const createBooking = async(seatNumber,movieId,showtimeId)=>{
    // console.log("Inside createBOooiing api",seatNumber,movieId,showtimeId);
    // return;
    const formData = {
        seatNumber,
        showtimeId
    }
    const res = await axios.post(`http://localhost:8000/bookings/${movieId}/create`,{seatNumber,showtimeId}, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    }).catch(err=>console.log("Hyaa ho k error",err))
    console.log(res);
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

export const sendUserLoginRequest = async(data)=>{
    const res = await axios.post("http://localhost:8000/login/user",{
        email: data.email,
        password: data.password
    }).catch((err)=>{
        console.log(err)
    })
    
    const resData = await res.data
    return resData
}

export const getMovieById = async()=>{
    
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