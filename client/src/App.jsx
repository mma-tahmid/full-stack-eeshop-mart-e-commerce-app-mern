
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import PolicyPage from './Pages/PolicyPage'
import PageNotFoundPage from './Pages/PageNotFoundPage'
import RegisterPage from './Pages/Auth/RegisterPage'
import LoginPage from './Pages/Auth/LoginPage'
//import Dashboard from './Pages/User/Dashboard'
import PrivateRotess from './Components/Routes/Private'
import Dashboard from './Pages/User/Dashboard'
import ForgotPassword from './Pages/Auth/ForgotPassword'

function App() {


  return (


    <>


      <BrowserRouter>

        <Routes>


          <Route path="/" element={<HomePage />} />

          {/* Nested Routes */}

          <Route path="/dashboard" element={<PrivateRotess />}>

            <Route path="" element={<Dashboard />} />

          </Route>



          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PolicyPage />} />


          <Route path="*" element={<PageNotFoundPage />} />



        </Routes>
      </BrowserRouter>





    </>
  )
}

export default App
