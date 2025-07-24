import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from './HomePage/Sidebar';
import Salescarousel from './HomePage/Salescarousel';
import CategoryCarousel from './HomePage/CategoryCarousel';
import Sales from './HomePage/Sales';
import Highlight from './HomePage/Highlight';
import Featured from './HomePage/Featured'
import Support from './HomePage/Support';
const Home = ({sidebarOpen,toggleSidebar}) => {
  const [mainCarousel, setMainCarousel] = useState([]);
const [sales, setSales] = useState([]);
const [features, setFeatures] = useState([]);
const [bestSellingProducts, setBestSellingProducts] = useState([]);
const [newArrivals, setNewArrivals] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}home`);
      console.log('BASE URL:', process.env.REACT_APP_API_BASE_URL);
      const data = response.data;
      // console.log("Fetched data from backend:", data);
      setMainCarousel(data.filter(item => item.category === "mainCarousel"));
      setFeatures(data.filter(item => item.category === "features"));
      setSales(data.filter(item => item.category === "sales"));
      setBestSellingProducts(data.filter(item => item.category === "bestSellingProducts"));
      setNewArrivals(data.filter(item => item.category === "newArrivals"));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


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


