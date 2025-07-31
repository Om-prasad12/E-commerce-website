import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Stars from "./HomePage/Stars";

const CategoryPage = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  const categoryMap = {
    electronics: "Electronics",
    clothing: "Clothing",
    books: "Books",
    beauty: "Beauty",
    sports: "Sports",
    homelifestyle: "Home Appliances",
    health: "Beauty", 
    "sports-and-outdoor": "Sports",
  };

  useEffect(() => {
    const fetchCart = async () => {
      const queryCategory = categoryMap[id?.toLowerCase()] || id || "all";   
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}prod/category/${queryCategory}`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data);
        setCartItems(res.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    };
    
    if (id) {
      fetchCart(); 
    }
  }, [id]);

  const categoryDisplayName = categoryMap[id?.toLowerCase()] || id || "Category";

  const handleAddToCart = async (e,productId,vendorId) => {
    try {
       await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/cart`,
        {
          productId,
          vendorId,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to cart");
    } catch (error) {
      // console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to add cart item");
    }
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "name":
        return [...products].sort((a, b) => a.title?.localeCompare(b.title));
      default:
        return products;
    }
  };

  const sortedItems = sortProducts(cartItems);

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-36 sm:mt-28 md:mt-32 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto  sm:py-6">
          
          {/* Breadcrumb - Only show when there are products */}
          {sortedItems.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span 
                className="hover:text-red-500 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="mx-2">{'>'}</span>
              <span className="text-gray-900 font-medium capitalize">{categoryDisplayName}</span>
            </div>
          )}

          {/* Category Header - Only show when there are products */}
          {sortedItems.length > 0 && (
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
                {categoryDisplayName}
              </h1>
              <p className="text-gray-600">
                {`${sortedItems.length} products found`}
              </p>
            </div>
          )}

          {/* Filters and Sort Bar - Only show when there are products */}
          {sortedItems.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">View:</span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          {sortedItems.length > 0 && (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {sortedItems.map((item, index) => (
                <div key={item._id || index} className={
                  viewMode === "grid" 
                    ? "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group" 
                    : "bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow duration-300"
                }>
                  {viewMode === "grid" ? (
                    <>
                      {/* Grid View */}
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || item.images?.[0] || "/api/placeholder/300/200"}
                          alt={item.name || "Product"}
                          className="w-full h-48 object-contain cursor-pointer group-hover:scale-105 transition-transform duration-300"
                          onClick={() => navigate(`/product/${item._id}`)}
                          onError={(e) => {
                            e.target.src = "/api/placeholder/300/200";
                          }}
                        />
                        {item.discount && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            -{item.discount}%
                          </div>
                        )}
                        <button
                          onClick={(e) => handleAddToCart(e,item._id,item.userId)}
                          className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title || "Product Name"}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Stars rating={item.ratings} />
                          <span className="text-sm text-gray-500 ml-1">({item.numReviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-500">
                              ₹{item.price || "0.00"}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <img
                        src={item.image || item.images?.[0] || "/api/placeholder/200/150"}
                        alt={item.name || "Product"}
                        className="w-32 h-24 object-contain cursor-pointer rounded"
                        onClick={() => navigate(`/product/${item._id}`)}
                        onError={(e) => {
                          e.target.src = "/api/placeholder/200/150";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.name || "Product Name"}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Stars rating={item.ratings} />
                          <span className="text-sm text-gray-500 ml-1">({item.numReviews || 0})</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.description || "Product description..."}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-500">
                              ₹{item.price || "0.00"}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e,item._id,item.userId)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {sortedItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products in this category. Try browsing other categories.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Browse All Products
              </button>
            </div>
          )}

          {/* Load More Button (if needed) */}
          {sortedItems.length > 0 && sortedItems.length >= 20 && (
            <div className="text-center mt-12">
              <button className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200">
                Load More Products
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CategoryPage;