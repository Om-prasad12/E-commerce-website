import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Heading with responsive text size */}
      <h1 className="text-black text-[40px] xs:text-[50px] sm:text-[80px] md:text-[100px] lg:text-[110px] font-inter font-medium tracking-wide leading-tight">
        404 Not Found
      </h1>
      
      {/* Subheading text */}
      <p className="mt-4 text-center text-sm xs:text-md sm:text-lg md:text-xl text-gray-600">
        Your visited page not found. You may go to the home page.
      </p>
      
      {/* Home button */}
      <a 
        href="/" 
        className="mt-8 bg-red-600 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-lg hover:bg-red-500 transition-all text-xs xs:text-sm sm:text-md md:text-lg"
      >
        Back to Home Page
      </a>
    </div>
  );
};

export default NotFound;
