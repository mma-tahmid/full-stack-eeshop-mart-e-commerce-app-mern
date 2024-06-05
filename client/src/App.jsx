
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
import AdminRoute from './Components/Routes/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminCreateCategoryPage from './Pages/Admin/AdminCreateCategoryPage'
import AdminCreateProductPage from './Pages/Admin/AdminCreateProductPage'
import AllUsersPage from './Pages/Admin/AllUsersPage'
import UserOrderPage from './Pages/User/UserOrderPage'
import UserProfilePage from './Pages/User/UserProfilePage'
import AdminProductListPage from './Pages/Admin/AdminProductListPage'
import AdminUpdateProduct from './Pages/Admin/AdminUpdateProduct'

function App() {


  return (


    <>


      <BrowserRouter>

        <Routes>


          <Route path="/" element={<HomePage />} />

          {/* Nested Routes */}

          <Route path="/dashboard" element={<PrivateRotess />}>

            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<UserOrderPage />} />
            <Route path="user/profile" element={<UserProfilePage />} />

          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>

            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<AdminCreateCategoryPage />} />
            <Route path="admin/create-product" element={<AdminCreateProductPage />} />
            <Route path="admin/update-single-product/:slug" element={<AdminUpdateProduct />} />
            <Route path="admin/products-list" element={<AdminProductListPage />} />

            <Route path="admin/useresss" element={<AllUsersPage />} />

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
