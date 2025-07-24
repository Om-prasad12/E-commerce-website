import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Highlight = ({data}) => {
  const targetDate = "2025-08-18T00:00:00";
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Update the countdown timer every second
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  const [mainContent,setMainContent] = useState([
          
      ]);
      
      useEffect(() => {
          if (data && data.length > 0) {
            setMainContent(data);
          } else {
            // console.error("No data available for the carousel.");
          }
      },[data])

  

  return (
    <section className={`w-[80%] m-auto mb-10  xl:mb-14`}>
    <div className="w-[95%] max-w-[1170px] h-auto bg-gradient-to-r from-black to-gray-900 flex flex-col md:flex-row items-center px-6 md:px-10 py-10 mb-5 md:mb-20">
      
      {/* Left Content (Text) */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left">
        <p className="text-green-500 font-semibold text-lg">Categories</p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight my-4">
          {mainContent[0]?.product?.promoTagline}
        </h2>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 my-6">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((time, index) => (
            <div key={index} className="bg-white text-black font-semibold w-14 h-14 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full">
              <p className="text-sm md:text-xl">
                {(time.value || 0).toString().padStart(2, "0")}
              </p>
              <span className="text-xs md:text-sm">{time.label}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="bg-green-500 text-black font-semibold py-3 px-6 rounded-lg mt-4 hover:bg-green-600 transition hidden md:block"
        onClick={() => {
            const productId = mainContent[0]?.product?._id ;
            if (productId) {
              navigate(`/product/${productId}`);
            } else {
              console.log("No product ID available for navigation.");
            }
          }}>
          Buy Now!
        </button>
      </div>

      {/* Right Image (Responsive) */}
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src={mainContent[0]?.product?.images[0]}
          alt="JBL Speaker"
          className="w-[80%] md:w-[500px] h-auto"
        />
      </div>
      <div className='md:hidden '>
        <button
          className="bg-green-500 text-black font-semibold py-3 px-6 rounded-lg mt-4 hover:bg-green-600 transition"
          onClick={() => {
            const productId = mainContent[0]?.product?._id ;
            if (productId) {
              navigate(`/product/${productId}`);
            } else {
              console.log("No product ID available for navigation.");
            }
          }}
        >
          Buy Now!
        </button>
        </div>
    </div>
    </section>
  );
};

export default Highlight;
