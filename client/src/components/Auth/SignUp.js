import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = ({ setLoggedIn }) => {
  const image = "../../assets/Login/LoginLogo.png";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password match validation before making request
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/signup`, formData, {
        withCredentials: true
      });

      if (res.data && res.data.message) {
        if (res.status === 201) {
          toast.success('Sign Up successful!');
        setTimeout(() => {
            toast.info('An Email has been sent to verify your account. Please check your inbox.');
        }, 3000);
          setLoggedIn(true);
          navigate('/');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      console.error('Error during signup:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="font-[sans-serif] mt-32 md:mt-20">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-6 max-w-6xl max-md:max-w-lg w-full p-2 m-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-2 py-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-2xl font-extrabold">Sign Up</h3>
                <p className="text-xs mt-2 text-gray-800">
                  Already have an account
                  <Link to="/login" className="text-blue-600 font-semibold hover:underline m-1">
                    Login here
                  </Link>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-xs border-b border-gray-300 focus:border-blue-600 px-2 py-2 outline-none"
                  placeholder="Enter Name"
                />
              </div>

              <div className="mt-4">
                <label className="text-gray-800 text-xs block mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-xs border-b border-gray-300 focus:border-blue-600 px-2 py-2 outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div className="mt-4">
                <label className="text-gray-800 text-xs block mb-1">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-xs border-b border-gray-300 focus:border-blue-600 px-2 py-2 outline-none"
                  placeholder="Enter phone"
                />
              </div>

              <div className="mt-4">
                <label className="text-gray-800 text-xs block mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-xs border-b border-gray-300 focus:border-blue-600 px-2 py-2 outline-none"
                  placeholder="Enter password"
                />
              </div>

              <div className="mt-4">
                <label className="text-gray-800 text-xs block mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-xs border-b border-gray-300 focus:border-blue-600 px-2 py-2 outline-none"
                  placeholder="Confirm password"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2 px-4 text-xs tracking-wide text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:block">
            <img src={image} alt="Login Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
