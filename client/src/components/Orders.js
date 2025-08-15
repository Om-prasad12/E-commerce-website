import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
FaBoxOpen, 
FaRupeeSign, 
FaTruck, 
FaCheckCircle,
FaArrowLeft
} from "react-icons/fa";

const Orders = () => {
const { orderId } = useParams();
const [orderData, setOrderData] = useState(null);
const [address, setAddress] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}order/${orderId}`, { 
        withCredentials: true 
      });
      console.log("Order Data:", res.data.products);
      console.log("Shipping Address:", res.data.shippingAddress);
      setOrderData(res.data.products);
      setAddress(res.data.shippingAddress);
    } catch (error) {
      toast.error("Failed to load order details");
    }
  };

  if (orderId) {
    fetchOrder();
  }
}, [orderId]);





if (!orderData) {
  return (
    <div className="bg-[#f9f6f2] ">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-12 sm:py-6 md:py-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 sm:p-12 text-center min-h-[400px] flex flex-col justify-center">
            <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Order not found</h3>
            <p className="text-gray-500 text-lg mb-8">The order you're looking for doesn't exist or may have been removed</p>
            <button 
              onClick={() => navigate('/')}
              className="mx-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-12 sm:py-6 md:py-8">
          {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FaArrowLeft className="text-lg" />
                  <span className="font-medium">Back</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Order Details</h1>
                </div>

                {/* Order ID and Status */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Order #{orderId}</h2>
                  <div className="flex items-center gap-2 text-green-600 mb-3">
                    <FaCheckCircle />
                    <span className="font-medium">Order Confirmed</span>
                  </div>
                  {/* Shipping Address in one line */}
                  {address && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaTruck className="text-blue-600" />
                    <span>
                      {address.street}, {address.city}, {address.state} {address.pincode}
                    </span>
                    </div>
                  )}
                  </div>
                  <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Order Total</p>
                  <p className="text-2xl font-bold text-gray-800 flex items-center justify-end gap-1">
                    <FaRupeeSign className="text-lg" />
                    {orderData.reduce((total, item) => total + (item.product.price * item.quantity), 0).toLocaleString()}
                  </p>
                  </div>
                </div>
                </div>
          
          {/* Order Items */}
          <div className="bg-white border rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaBoxOpen className="text-green-600" />
              Order Items ({orderData.length})
            </h3>
            
            <div className="space-y-6">
              {orderData.map((item, index) => (
                <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title}
                      className="w-full sm:w-24 h-48 sm:h-24 object-fit rounded-lg"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.product.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">Brand: {item.product.brand}</p>
                    <p className="text-sm text-gray-600 mb-2">SKU: {item.product.sku}</p>
                    
                    {/* Price and Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FaRupeeSign className="text-sm" />
                          <span className="font-semibold text-lg">{item.product.price.toLocaleString()}</span>
                        </div>
                        {item.product.discount > 0 && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm line-through">
                            <FaRupeeSign className="text-xs" />
                            <span>{item.product.actualPrice.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        Quantity: <span className="font-medium">{item.quantity}</span>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <div className="flex items-center gap-1 font-semibold">
                          <FaRupeeSign className="text-sm" />
                          <span>{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaRupeeSign />
                    <span>{orderData.reduce((total, item) => total + (item.product.price * item.quantity), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}

export default Orders
