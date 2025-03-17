import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/layouts/Header'; // Importing the Header component
import Footer from './components/layouts/Footer';
import Home from './components/Home'; // Importing the Home component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing React Router components
import { HelmetProvider } from 'react-helmet-async'; // Importing HelmetProvider
import {ToastContainer}  from 'react-toastify'
import ProductDetail from './components/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Profile from './components/user/Profile';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <ToastContainer theme='dark' position='bottom-center'/>
          {/* Define the routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Home route to display products */}
            <Route path="/search/:keyword" element={<ProductSearch />} /> {/* Home route to display products */}
            <Route path="/login" element={<Login />} /> {/* Home route to display products */}
            <Route path="/cart" element={<Cart />} /> {/* Home route to display products */}
            <Route path="/register" element={<Register />} /> {/* Home route to display products */}
            <Route path="/shipping" element={<Shipping />} /> {/* Home route to display products */}
            <Route path="/order/confirm" element={<ConfirmOrder />} /> {/* Home route to display products */}
            <Route path="/order/success" element={<OrderSuccess/>} /> {/* Home route to display products */}
            <Route path="/orders" element={<UserOrders/>} /> {/* Home route to display products */}
            {stripeApiKey && <Route path='/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements> } />}
            <Route path='/order/:id' element={<OrderDetail/> } />
            <Route path='/myprofile' element={<Profile/> } />
            <Route path='/myprofile/update' element={<UpdateProfile />} />
            <Route path='/myprofile/update/password' element={<UpdatePassword />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />                            
          </Routes>
          <Footer />
        </div>

        <Routes>
  <Route path='/admin/dashboard' element={ <Dashboard/> } />
  <Route path='/admin/products' element={ <ProductList/> } />
  <Route path='/admin/products/create' element={ <NewProduct/> } />
  <Route path='/admin/product/:id' element={ <UpdateProduct/> } />
  <Route path='/admin/orders' element={ <OrderList/> } />
  <Route path='/admin/order/:id' element={ <UpdateOrder/> } />
  <Route path='/admin/users' element={ <UserList/> } />
  <Route path='/admin/user/:id' element={ <UpdateUser/> } />
  <Route path='/admin/reviews' element={ <ReviewList/> } />
</Routes>



      </Router>
    </HelmetProvider>
  );
}

export default App;
