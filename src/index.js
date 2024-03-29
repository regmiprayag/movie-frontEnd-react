import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios"
// import { createStore } from 'redux';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import {store} from "./store/userSlice"
import toast, { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "http://localhost:8000"
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
