// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     isLoggedIn: false,
//     value: {}
// }

// const userSlice = createSlice({
//     name:"user",
//     initialState,
//     reducers:{
//         login(state){
//             state.isLoggedIn = true
//         },
//         logout(state){
//             localStorage.removeItem("userId")
//             localStorage.removeItem("token")
//             state.isLoggedIn = false
//         },
//     },
// })

// export const userActions = userSlice.actions

// export const store = configureStore({
//     reducer:{
//         user:userSlice.reducer,
//     }
// })
import { createSlice,configureStore } from '@reduxjs/toolkit';

const initialState = {
    bookedSeats: [],
    showtimeId: '',
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state, action) {
            state.bookedSeats = action.payload.bookedSeats;
            state.showtimeId = action.payload.showtimeId;
        },
        clearData(state) {
            state.bookedSeats = [];
            state.showtimeId = '';
        },
    },
});

// export const { setData, clearData } = dataSlice.actions;

// export default dataSlice.reducer;

export const dataActions = dataSlice.actions

export const dataStore = configureStore({
    reducer:{
        data:dataSlice.reducer,
    }
})