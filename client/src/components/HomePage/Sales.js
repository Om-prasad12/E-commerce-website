import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import {toast} from "react-toastify";

const Sales = ({data}) => {
  const navigate = useNavigate();

    const [mainContent,setMainContent] = useState([
        
    ]);
    
    useEffect(() => {
        if (data && data.length > 0) {
          setMainContent(data);
        } else {
          // console.error("No data available for the carousel.");
        }
    },[data])

  const handleWishlist = async (_id, userId) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}user/wishlist`, {
        productId: _id,
        vendorId: userId,
        },{
           withCredentials: true 
        });
      if(res.status === 200) {
        toast.success("Product added to wishlist");
      } else{
        toast.error(res.data.message || "Failed to add to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to wishlist");
      // console.error("Failed to add to wishlist:", error);
    }
  };  


  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(5);
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(4);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3);
      } else {
        setVisibleItems(2);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  return (
    <>
      <div className="bg-gray-100 xl:bg-gray-300">
        {/* Container with max width for centering content on large screens */}
        <div className="max-w-[1530px] mx-auto bg-white">
          <section className={`w-[90%] md:w-[80%] m-auto mb-10  xl:mb-14`}>
            <div className="flex justify-between h-auto">
              <div>
                <div className="flex">
                  <svg xmlns="http:/</div>/www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                  </svg>
                  <p className="mt-2 mx-1 xl:m-3 text-base font-semibold" style={{ color: "#DB4444" }}>
                    This Month
                  </p>
                </div>
                <div className="md:mt-4">
                  <p className="text-2xl md:text-4xl font-semibold tracking-wide mt-2 mr-3 md:mr-5 xl:mr-6">
                    Best Selling Products
                  </p>
                </div>
              </div>
              <div>
                <button className="bg-red-500 text-white font-semibold text-sm md:text-lg px-10 md:px-12 py-4 my-10 xl:my-14">
                  View All
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start m-4 overflow-hidden gap-x-4 md:gap-x-6">
              {mainContent.slice(0, visibleItems).map(({product: { _id,images,title,discount,ratings,actualPrice,price,userId } }) => (
                <div
                  key={_id}
                  style={{
                    flex: `0 0 calc(100% / ${visibleItems} - 1rem)`,
                    maxWidth: `calc(100% / ${visibleItems} - 1rem)`,
                  }}
                >
                <div className="rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => {navigate(`/product/${_id}`);}}>
                 <div className="border-2 rounded-lg overflow-hidden relative">
                    {discount && (
                      <div className="absolute top-2 mx-2 bg-red-500 text-white px-3 py-1 text-base rounded-md font-bold">
                        -{discount}%
                      </div>
                    )}

                    <div className="absolute top-2 right-1 flex space-x-2">
                      <button className="p-2 bg-white rounded-full shadow"
                        onClick={(e) => {
                          e.stopPropagation();  // Stop event bubbling to parent div
                          handleWishlist(_id, userId);
                        }}>
                        <CiHeart />
                      </button>
                    </div>

                    <div className="flex justify-center items-center p-10 md:p-10 xl:p-12 bg-gray-100">
                      <img src={images[0]} alt="product" className="w-[100px] sm:w-[120px] md:w-[150px] xl:w-[172px] aspect-[113/100]" />
                    </div>

                    <div className="text-base font-semibold m-2">
                      {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </div>

                    <div className="px-3 py-2 bg-white">
                      <div className="flex">
                        <div className="text-red-500 text-lg font-bold m-2">{price}</div>
                        {actualPrice && <div className="text-gray-400 text-lg line-through m-2">{actualPrice}</div>}
                      </div>

                      <div className="flex space-x-1 w-au</div>to h-auto">
                        <Stars ratings={ratings} />
                      </div>
                    </div>
                  </div> 
                </div>  
                  
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <hr className="w-10/12 mx-auto border-gray-400 mb-5 md:mb-20" />
    </>
  );
};

export default Sales;
