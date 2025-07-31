import React, { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import {toast} from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for missing required fields
    if (!formData.name) {
      toast.error('Please fill in your name');
      return;
    }
    if (!formData.email) {
      toast.error('Please fill in your email');
      return
    }
    if (!formData.phone) {
      toast.error('Please fill in your phone number');
      return
    }
    
    // Handle form submission here
    toast.success('Your message has been sent successfully!');
    
    // Clear all fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-32 px-4 sm:px-6 md:px-20 xl:px-32">
        <div className="w-full sm:w-[90%] md:w-full xl:w-[95%] mx-auto py-9 lg:py-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 sm:mb-12">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-800">Contact</span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              
              {/* Call To Us Section */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <FiPhone className="text-white w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Call To Us</h2>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
                
                <hr className="my-8 border-gray-300" />
              </div>

              {/* Write To US Section */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <FiMail className="text-white w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Write To US</h2>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white">
              <div onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name, Email, Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="8"
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 resize-vertical"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-12 py-4 rounded-md transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;