import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import App from './App';
import reportWebVitals from './reportWebVitals';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPK1Rwp_0vvQoaXQQVmL8TvFXA3oQfPYA",
  authDomain: "yokaiproductos.firebaseapp.com",
  projectId: "yokaiproductos",
  storageBucket: "yokaiproductos.appspot.com",
  messagingSenderId: "429709317388",
  appId: "1:429709317388:web:ff4d7cdb5df0fc1c8da529"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
