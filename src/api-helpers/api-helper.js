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
    const res = await axios.get(`http://localhost:8000/common/movies/${id}`).catch((err)=>{console.log(err)})
    // if(res.status!==200){
    //     return console.log("Unexpected error ")
    // }
    const resData = await res.data
    return resData
}