import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults = [], searchQuery = '', totalResults = 0 } = location.state || {};

  const [filteredResults, setFilteredResults] = useState(searchResults);
  const [sortBy, setSortBy] = useState('relevance');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);

  // Fetch user's wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}user/wishlist`,
          { 
            withCredentials: true,
            skipLoader: true 
          }
        );
        
        if (response.data.success) {
          // Extract product IDs from wishlist
          const wishlistProductIds = response.data.wishlist?.map(item => 
            item.productId?._id || item.productId || item._id
          ) || [];
          setWishlist(wishlistProductIds);
        }
      } catch (error) {
        // Silently handle error - user might not be logged in
        console.log('Could not fetch wishlist:', error.response?.data?.message);
      }
    };

    fetchWishlist();
  }, []);

  // Sort results
  useEffect(() => {
    let filtered = [...searchResults];

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default: // relevance
        break;
    }

    setFilteredResults(filtered);
  }, [searchResults, sortBy]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  // Handle wishlist toggle
  const handleWishlist = async (_id, userId) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}user/wishlist`, {
        productId: _id,
        vendorId: userId,
        },{
           withCredentials: true,
           skipLoader: true
        });
        
      if(res.status === 200) {
        const isCurrentlyInWishlist = wishlist.includes(_id);
        
        if (isCurrentlyInWishlist) {
          toast.success("Product removed from wishlist");
          setWishlist(prev => prev.filter(id => id !== _id));
        } else {
          toast.success("Product added to wishlist");
          setWishlist(prev => [...prev, _id]);
        }
      } else{
        toast.error(res.data.message || "Failed to update wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  // Handle add to cart
  const handleAddToCart = async (productId, vendorId) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/cart`,
        {
          productId,
          vendorId,
        },
        {
          withCredentials: true,
          skipLoader: true
        }
      );
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to add cart item");
    } finally {
      setLoading(false);
    }
  };

  if (!searchQuery) {
    return (
      <div className="bg-[#f9f6f2]">
        <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
          <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-8 text-center">
            <h2 className="text-2xl font-medium text-gray-700">Start Your Search</h2>
            <p className="text-gray-500 mt-2">Use the search bar above to find products</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-9 sm:py-6 ">
          
          {/* Sort Only */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium mb-1">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-500">
                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* No Results */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <IoMdSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">
                Try searching for different keywords
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Browse All Products
                </button>
              </div>
            </div>
          ) : (
            /* Product List - List Style Design */
            <div className="space-y-4">
              {filteredResults.map((product) => (
                <div 
                  key={product._id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* Product Image */}
                    <div className="flex-shrink-0 relative group">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.images?.[0] || '/placeholder-image.jpg'}
                          alt={product.title}
                          className="w-full sm:w-32 md:w-40 h-32 md:h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </Link>
                      
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          
                          {/* Title and Details */}
                          <div className="flex-grow">
                            <Link to={`/product/${product._id}`}>
                              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 hover:text-red-500 transition-colors line-clamp-2">
                                {product.title}
                              </h3>
                            </Link>

                            {/* Category */}
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                            {/* Rating */}
                            {product.ratings > 0 && (
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-0.5">
                                  {renderStars(product.ratings)}
                                </div>
                                <span className="text-sm text-gray-500">
                                  ({product.numOfReviews || 0} reviews)
                                </span>
                              </div>
                            )}

                            {/* Description - Show first 100 characters */}
                            {product.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description.length > 100 
                                  ? `${product.description.substring(0, 100)}...` 
                                  : product.description}
                              </p>
                            )}
                          </div>

                          {/* Wishlist Button - Updated to show correct heart color */}
                          <button
                            onClick={() => handleWishlist(product._id, product.vendorId || product.userId)}
                            disabled={loading}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors self-start"
                          >
                            {wishlist.includes(product._id) ? (
                              <FaHeart className="text-red-500 text-xl" />
                            ) : (
                              <FaRegHeart className="text-gray-400 text-xl hover:text-red-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Price and Action Section */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-lg text-gray-500 line-through">
                              ₹{Math.round(product.price / (1 - product.discount / 100))}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAddToCart(product._id, product.vendorId || product.userId)}
                            disabled={loading}
                            className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm sm:text-base disabled:opacity-50"
                          >
                            <RiShoppingCart2Line />
                            {loading ? 'Adding...' : 'Add to Cart'}
                          </button>
                          
                          <Link 
                            to={`/product/${product._id}`}
                            className="border border-gray-300 text-gray-700 px-4 sm:px-6 py-2 rounded-md hover:bg-gray-50 transition-colors text-center text-sm sm:text-base"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search Again Section */}
          {filteredResults.length > 0 && (
            <div className="mt-12 text-center py-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Didn't find what you're looking for?
              </h3>
              <p className="text-gray-500 mb-4">
                Try a different search term or browse our categories
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Browse All Products
                </button>
                <Link
                  to="/category/Electronics"
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SearchPage;
