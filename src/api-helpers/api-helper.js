import axios from "axios"

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
    // const data = await res.data;
    // console.log(await res.data);
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