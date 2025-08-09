import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Featured = ({ data }) => {
  const [featuredItems, setFeaturedItems] = useState({
    category1: null,
    category2: null,
    category3: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length > 0) {
      // Filter and organize data by subCategory
      const category1Item = data.find(item => item.subCategory === 'category1');
      const category2Item = data.find(item => item.subCategory === 'category2');
      const category3Items = data.filter(item => item.subCategory === 'category3');

      setFeaturedItems({
        category1: category1Item || null,
        category2: category2Item || null,
        category3: category3Items.slice(0, 2) // Take only first 2 items for category3
      });
    }
  }, [data]);

  const handleNavigate = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  // Don't render the section if no data
  if (!featuredItems.category1 && !featuredItems.category2 && featuredItems.category3.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-100 xl:bg-gray-300">
        {/* Container with max width for centering content on large screens */}
        <div className="max-w-[1530px] mx-auto bg-white">
          <section className={`w-[90%] sm:w-[80%] m-auto mb-10 xl:mb-14`}>
            <div className="flex justify-between h-auto">
              <div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                  </svg>
                  <p className="mt-2 mx-1 xl:m-3 text-base font-semibold" style={{ color: "#DB4444" }}>
                    Featured
                  </p>
                </div>
                <div className="md:mt-4">
                  <p className="text-2xl md:text-4xl font-semibold tracking-wide mt-2 mr-3 md:mr-5 xl:mr-6">
                    New Arrivals
                  </p>
                </div>
              </div>
            </div>
            <div className="my-6">
              <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6 w-full h-auto mt-5 md:mt-10 md:h-[550px]">
                
                {/* Large featured item - Category 1 */}
                {featuredItems.category1 && (
                  <div 
                    className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-center cursor-pointer transition-opacity" 
                    style={{ 
                      backgroundImage: featuredItems.category1.product.images && featuredItems.category1.product.images[0]
                        ? `url(${featuredItems.category1.product.images[0]})` 
                        : 'none'
                    }}
                    onClick={() => handleNavigate(featuredItems.category1.product._id)}
                  >
                    <h2 className="text-xl font-semibold">
                      {featuredItems.category1.product.title}
                    </h2>
                    <p className="text-sm">
                      {featuredItems.category1.product.description?.length > 80 
                        ? `${featuredItems.category1.product.description.substring(0, 80)}...` 
                        : featuredItems.category1.product.description}
                    </p>
                    <button className="text-white underline mt-2 text-left">Shop Now</button>
                  </div>
                )}

                {/* Category 2 */}
                {featuredItems.category2 && (
                  <div 
                    className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-right cursor-pointer transition-opacity" 
                    style={{ 
                      backgroundImage: featuredItems.category2.product.images && featuredItems.category2.product.images[0]
                        ? `url(${featuredItems.category2.product.images[0]})` 
                        : 'none'
                    }}
                    onClick={() => handleNavigate(featuredItems.category2.product._id)}
                  >
                    <h2 className="text-xl font-semibold">
                      {featuredItems.category2.product.title}
                    </h2>
                    <p className="text-sm w-1/2">
                      {featuredItems.category2.product.description?.length > 60 
                        ? `${featuredItems.category2.product.description.substring(0, 60)}...` 
                        : featuredItems.category2.product.description}
                    </p>
                    <button className="text-white underline mt-2 text-left">Shop Now</button>
                  </div>
                )}

                {/* Category 3 Items - Two smaller items */}
                {featuredItems.category3.map((item, index) => (
                  <div 
                    key={item._id}
                    className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-center cursor-pointer transition-opacity" 
                    style={{ 
                      backgroundImage: item.product.images && item.product.images[0]
                        ? `url(${item.product.images[0]})` 
                        : 'none'
                    }}
                    onClick={() => handleNavigate(item.product._id)}
                  >
                    <h2 className="text-lg font-semibold">
                      {item.product.title}
                    </h2>
                    <p className="text-sm">
                      {item.product.description?.length > 40 
                        ? `${item.product.description.substring(0, 40)}...` 
                        : item.product.description}
                    </p>
                    <button className="text-white underline mt-2 text-left">Shop Now</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Featured;