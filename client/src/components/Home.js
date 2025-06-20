import React from 'react';
import Sidebar from './HomePage/Sidebar';
import Salescarousel from './HomePage/Salescarousel';
import CategoryCarousel from './HomePage/CategoryCarousel';
import Sales from './HomePage/Sales';
import Highlight from './HomePage/Highlight';
import Featured from './HomePage/Featured'
import Support from './HomePage/Support';
const Home = ({sidebarOpen,toggleSidebar}) => {

  return (
    <div className="bg-[#f9f6f2]">
      {/* Container with max width for centering content on large screens */}
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg">
        <div>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          {/* Other components */}
          <Salescarousel />
          <CategoryCarousel />
          <Sales/>
          <Highlight/>
          <Featured/>
          <Support/>
        </div>
      </div>
    </div>
  )
}


export default Home


