import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import SignUp  from './components/Auth/SignUp';
import NotFound from './components/Error404';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn}/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Route for ProductPage */}
        <Route path="/category/:id" element={<CategoryPage />} /> {/* Route for CategoryPage */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
