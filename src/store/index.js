import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("userId")
            localStorage.removeItem("token")
            state.isLoggedIn = false
        },
    },
})

export const userActions = userSlice.actions

export const store = configureStore({
    reducer:{
        user:userSlice.reducer,
    }
})