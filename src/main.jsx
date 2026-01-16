// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
import './index.css'
// import {Toaster} from 
// import AuthProvider from './context/AuthContext.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <App />
          <Toaster 
            position='top-right'
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '16px',
                fontSize: '14px',
                fontWeight: '500'
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff'
                },
                style: {
                  border: '1px solid #10b981',
                  background: '#f0fdf4'
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff'
                },
                style: {
                  border: '1px solid #ef4444',
                  background: '#fef2f2'
                }
              },
              loading: {
                iconTheme: {
                  primary: '#3b82f6',
                  secondary: '#fff'
                },
                style: {
                  border: '1px solid #3b82f6',
                  background: '#eff6ff'
                }
              }
            }}
          />
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
