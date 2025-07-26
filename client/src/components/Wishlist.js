import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const navigate = useNavigate();

  // Fetch wishlist items from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}user/wishlist`,
          {
            withCredentials: true,
          }
        );
        setWishlistItems(res.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      }
    };

    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (product) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}user/wishlist/${product}`,
        {
          withCredentials: true,
        }
      );
      setWishlistItems((prev) =>
        prev.filter((item) => item.product._id !== product)
      );
      toast.info("Removed from wishlist");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error(error.message || "Failed to remove item");
    }
  };

  const handleAddToCart = async (productId, vendorId) => {
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

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 pt-10 ">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-medium">Wishlist</h2>
            {/* <button className="text-black text-sm sm:text-base px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-200 transition">
              Move all to bag
            </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full sm:w-[90%] md:w-[95%] mx-auto pb-8">
          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-500 w-full col-span-full text-lg sm:text-xl py-20">
                Your wishlist is empty. Time to shop!
              </p>
          ) : (
            wishlistItems.map((item) => {
              const product = item.product;
              return (
                <div
                  className="w-full aspect-[4/3] sm:aspect-[3/4]"
                  key={product._id}
                >
                  <div
                    className="border-2 rounded-md overflow-hidden relative h-full flex flex-col"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {/* Delete Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // this prevents the click from reaching parent
                        handleRemove(product._id);
                      }}
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:text-red-500 transition"
                    >
                      <RiDeleteBin6Line className="text-sm sm:text-base" />
                    </button>

                    {/* Product Image */}
                    <div className="flex justify-center items-center p-6 bg-gray-100 flex-grow">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-[120px] sm:w-[150px] object-contain"
                      />
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) =>{
                        e.stopPropagation();
                        handleAddToCart(product._id, product.vendorId)
                      }}
                      className="bg-black text-white px-3 py-2 w-full flex items-center justify-center gap-2 text-sm hover:bg-gray-800"
                    >
                      <IoCartOutline className="text-lg" /> Add to Cart
                    </button>

                    {/* Product Details */}
                    <div className="px-3 py-2 bg-white">
                      <p className="text-sm truncate">{product.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="text-red-500 text-sm font-bold mr-2">
                          ₹{product.price}
                        </div>
                        <div className="text-gray-400 text-xs line-through">
                          ₹{product.actualPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
