import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contextApi/authContext.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(

  //   <React.StrictMode>

  //     <App />

  //     <Toaster />

  //   </React.StrictMode>,


  <AuthProvider>

    <App />

    <Toaster />

  </AuthProvider>



)
