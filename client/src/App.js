import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import NotFound from './components/Error404';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import Profile from './components/Profile';
import Loader from './components/Loader';
import PaymentSuccess from './components/PaymentSuccess';
import Orders from './components/Orders';
import SearchPage from './components/SearchPage'; 

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      // Check if this request should skip the loader
      if (config.method && config.method.toLowerCase() === 'get' && !config.skipLoader) {
        setLoading(true);
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Only hide loader if it was shown (request didn't skip loader)
        if (!response.config.skipLoader) {
          setLoading(false);
        }
        return response;
      },
      (error) => {
        // Only hide loader if it was shown (request didn't skip loader)
        if (!error.config?.skipLoader) {
          setLoading(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Navbar toggleSidebar={toggleSidebar} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/order/:orderId" element={<Orders />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
