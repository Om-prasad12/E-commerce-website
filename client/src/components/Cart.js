import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}user/cart`,
          {
            withCredentials: true,
          }
        );
        setCartItems(res.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, []);

  const handleUpdateCart = async (productId, quantity) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}user/cart/${productId}`,
      { quantity },
      {
        withCredentials: true,
      }
    );

    toast.success("Cart updated successfully");

    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (item.productId._id === productId) {
            const newQuantity = item.quantity + quantity;
            //  Remove item if quantity becomes 0
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean) // Filter out null items
    );
  } catch (error) {
    // console.error("Failed to update cart item:", error);
    toast.error(error.response?.data?.message || error.message || "Failed to update cart item");
  }
};



  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 sm:py-6">
          <h2 className="text-md sm:text-xl pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-9 sm:py-3">
            Cart
          </h2>
          {cartItems.length != 0 && ( 
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 pl-5 sm:pl-12 md:pl-14 xl:pl-24 py-1 sm:py-9">
            <p className="text-sm sm:text-xl md:col-span-2">Product</p>
            <p className="text-sm sm:text-xl text-center">Price</p>
            <p className="text-sm sm:text-xl text-center">Quantity</p>
            <p className="text-sm sm:text-xl text-center">Subtotal</p>
          </div>)}

          <div className="pl-5 sm:pl-12 md:pl-14 xl:pl-24 py-4 sm:py-9">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 w-full col-span-full text-lg sm:text-xl py-20">
                🛒 Your cart is empty. Time to shop!
              </p>
            ) : (
              cartItems.map((item) => {
                const product = item.productId;
                return (
                  <div
                    key={product._id}
                    className="grid grid-cols-4 md:grid-cols-5 gap-4 items-center mb-6 md:mb-12"
                  >
                    <div className="md:flex items-center gap-4 col-span-1 md:col-span-2">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 md:w-16 md:h-16"
                      />
                      <h3 className="text-sm sm:text-lg truncate overflow-hidden py-2 md:p-4">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-center truncate">
                      ₹{product.price}
                    </p>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-between items-center border border-gray-300 rounded">
                        <button className="px-2 py-1 text-gray-500 hover:bg-gray-100" 
                          onClick={() => handleUpdateCart(product._id,-1)}>
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          readOnly
                          className="w-4 sm:w-10 text-center focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
                        />
                        <button className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                        onClick={() => handleUpdateCart(product._id,1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-base text-center truncate">
                      ₹{product.price * (item.quantity || 1)}
                    </p>
                  </div>
                );
              })
            )}
          </div>


          {/* Coupon + Total Section */}
          {cartItems.length > 0 && (
            <div className="flex justify-between flex-wrap pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-3 sm:py-4">
              <div className="flex items-start mt-6 sm:mt-10">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border border-gray-300 px-3 py-2 rounded-[4px] mr-3 w-40 sm:w-64"
                />
                <button className="text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]"
                  onClick={() => toast.error("Invalid coupon code")}>
                  Apply Coupon
                </button>
              </div>

              <div className="w-[400px] h-[276px] md:w-[470px] md:h-[324px] border border-gray-700 rounded-[4px] md:ml-3 p-4 sm:p-6 mt-6 sm:mt-10">
                <h4 className="text-lg font-medium">Cart total</h4>
                <div className="flex justify-between my-3">
                  <p className="text-sm sm:text-base">Subtotal:</p>
                  <p className="text-sm sm:text-base">
                    ₹
                    {cartItems.reduce(
                      (sum, item) =>
                        sum + item.productId.price * (item.quantity || 1),
                      0
                    )}
                  </p>
                </div>
                <hr className="my-3 border border-gray-300" />
                <div className="flex justify-between my-3">
                  <p className="text-sm sm:text-base">Shipping</p>
                  <p className="text-sm sm:text-base">Free</p>
                </div>
                <hr className="my-3 border border-gray-300" />
                <div className="flex justify-between my-3">
                  <p className="text-sm sm:text-base">Total:</p>
                  <p className="text-sm sm:text-base font-bold">
                    ₹
                    {cartItems.reduce(
                      (sum, item) =>
                        sum + item.productId.price * (item.quantity || 1),
                      0
                    )}
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]"
                    onClick={() => navigate("/checkout")}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
