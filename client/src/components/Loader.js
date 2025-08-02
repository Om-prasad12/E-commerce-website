import React from 'react';

const Loader = () => {
  // Ring loader with responsive sizing based on screen size
  const RingLoader = () => (
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 relative">
      <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-gray-200 rounded-full"></div>
      <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-100">
        <RingLoader />
      </div>
    </div>
  );
};

export default Loader;