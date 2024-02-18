import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    value: {}
}


const userSlice = createSlice({
    name:"user",
    initialState,
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
        user: userSlice.reducer,
    }
})

const logoutAfterTwoMinutes = () => {
    setTimeout(() => {
        store.dispatch(userActions.logout()); // Dispatch the logout action
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
}

// Call the function when the user logs in
store.subscribe(() => {
    const isLoggedIn = store.getState().user.isLoggedIn;
    if (isLoggedIn) {
        logoutAfterTwoMinutes();
    }
});