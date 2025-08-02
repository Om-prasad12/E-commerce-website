import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './HomePage/Sidebar';
import Salescarousel from './HomePage/Salescarousel';
import CategoryCarousel from './HomePage/CategoryCarousel';
import Sales from './HomePage/Sales';
import Highlight from './HomePage/Highlight';
import Featured from './HomePage/Featured'
import Support from './HomePage/Support';

const Home = ({sidebarOpen, toggleSidebar}) => {
  const [mainCarousel, setMainCarousel] = useState([]);
  const [sales, setSales] = useState([]);
  const [features, setFeatures] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in localStorage first
        const cachedData = localStorage.getItem('homePageData');
        const cacheTimestamp = localStorage.getItem('homePageDataTimestamp');
        const cacheExpiry = 10 * 60 * 1000; // 10 minutes in milliseconds
        
        if (cachedData && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > cacheExpiry;
          
          if (!isExpired) {
            // Use cached data
            const data = JSON.parse(cachedData);
            setMainCarousel(data.filter(item => item.category === "mainCarousel"));
            setFeatures(data.filter(item => item.category === "features"));
            setSales(data.filter(item => item.category === "sales"));
            setBestSellingProducts(data.filter(item => item.category === "bestSellingProducts"));
            setNewArrivals(data.filter(item => item.category === "newArrivals"));
            setDataLoaded(true);
            return; // Exit early, no API call needed
          }
        }

        // If no cache or expired, fetch fresh data
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}home`);
        console.log('BASE URL:', process.env.REACT_APP_API_BASE_URL);
        const data = response.data;
        
        // Store in localStorage with timestamp
        localStorage.setItem('homePageData', JSON.stringify(data));
        localStorage.setItem('homePageDataTimestamp', Date.now().toString());
        
        // Update state
        setMainCarousel(data.filter(item => item.category === "mainCarousel"));
        setFeatures(data.filter(item => item.category === "features"));
        setSales(data.filter(item => item.category === "sales"));
        setBestSellingProducts(data.filter(item => item.category === "bestSellingProducts"));
        setNewArrivals(data.filter(item => item.category === "newArrivals"));
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setDataLoaded(true); // Set to true even on error to prevent endless loading
      }
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]);

  return (
    <div className="bg-[#f9f6f2]">
      {/* Container with max width for centering content on large screens */}
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg">
        <div>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} data={mainCarousel}/>
          {/* Other components */}
          <Salescarousel data={sales} />
          <CategoryCarousel />
          <Sales data={bestSellingProducts}/>
          <Highlight data={features}/>
          <Featured data={newArrivals}/>
          <Support/>
        </div>
      </div>
    </div>
  )
}

export default Home