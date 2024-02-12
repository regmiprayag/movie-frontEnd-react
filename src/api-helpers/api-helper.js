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

export const loginAdmin = async(data)=>{
    const res = await axios
        .post("http://localhost:8000/login/admin",{
            email:data.email,
            password:data.password
        })
        .catch((err)=>{
            console.log(err)
        })
    if (res.status !== 200 || res.status !==201) {
        return console.log("Unexpected error occurred")
    }
    const resData = await res.data;
    return resData;
}