import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { VscSend } from "react-icons/vsc";
const Footer = () => {
  return (
    <footer className='bg-black text-white py-10'>
      <div className='container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
        
        {/* Column 1 - Exclusive */}
        <div>
          <h2 className='text-2xl font-medium mb-4 '>Exclusive</h2>
          <p className='mb-4 text-2xl font-medium'>Subscribe</p>
          <p className='mb-4 text-sm'>Get 10% off your first order</p>
          <div className='flex items-center border-2 border-white rounded'>
          <input type='email' placeholder='Enter your email' 
           className='p-3 w-full text-white placeholder-white bg-black border-none focus:outline-none text-sm font-medium'/>
           <button className='p-3 text-2xl'>
          <VscSend />
          </button>
         </div>
        </div>

        {/* Column 2 - Support */}
        <div>
          <h2 className='text-xl font-medium mb-4'>Support</h2>
          <p className='mb-2 text-sm'>111 Bijoy sarani, Dhaka,</p>
          <p className='mb-2 text-sm'>DH 1515, Bangladesh.</p>
          <p className='mb-2 text-sm'>exclusive@gmail.com</p>
          <p className='mb-2 text-sm'>+88015-88888-9999</p>
        </div>

        {/* Column 3 - Account */}
        <div>
          <h2 className='text-xl font-medium mb-4'>Account</h2>
          <p className='mb-2 text-sm font-medium cursor-pointer'>My Account</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Login / Register</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Cart</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Wishlist</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Shop</p>
        </div>

        {/* Column 4 - Quick Link */}
        <div>
          <h2 className='text-xl font-medium mb-4'>Quick Link</h2>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Privacy Policy</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Terms Of Use</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>FAQ</p>
          <p className='mb-2 text-sm font-medium cursor-pointer'>Contact</p>
        </div>

        {/* Column 5 - Download App */}
        <div>
          <h2 className='text-2xl font-medium mb-4'>Download App</h2>
          <p className='mb-4 text-sm'>Save $3 with App New User Only</p>
          <div className='flex gap-4'>
            <img 
              src='path_to_qr_code_image_1' 
              alt='QR Code' 
              className='w-16 h-16' 
            />
            <img 
              src='path_to_qr_code_image_2' 
              alt='QR Code' 
              className='w-16 h-16' 
            />
          </div>
          <div className='flex gap-4 mt-4'>
            <FaFacebookF className='text-xl cursor-pointer' />
            <FaTwitter className='text-xl cursor-pointer' />
            <FaInstagram className='text-xl cursor-pointer' />
            <FaLinkedinIn className='text-xl cursor-pointer' />
          </div>
        </div>
      </div>

      <div className='border-t border-gray-700 mt-10 pt-4 text-center text-sm'>
        <p>© Copyright Rimel 2022. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
