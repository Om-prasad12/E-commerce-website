import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FaBoxOpen, 
  FaRupeeSign, 
  FaTruck, 
  FaCalendarAlt, 
  FaCreditCard,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock
} from "react-icons/fa";

const Orders = ({ filter = "all" }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}user/orders`, { 
          withCredentials: true 
        });
        setOrders(res.data.orders);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load orders");
        setLoading(false);
      }
    };

    if(!orders.length) {
      fetchOrders();
    }
  }, []);

  // Filter orders based on the filter prop
  const filteredOrders = orders.filter(orderGroup => {
    if (filter === "all") return true;
    
    const order = orderGroup[0]; // Get order details from first item
    return order.orderStatus.toLowerCase() === filter.toLowerCase();
  });

  // Get filter display text
  const getFilterDisplayText = () => {
    switch (filter.toLowerCase()) {
      case "all": return "All Orders";
      case "cancelled": return "Cancelled Orders";
      case "delivered": return "Delivered Orders";
      case "shipped": return "Shipped Orders";
      case "processing": return "Processing Orders";
      default: return "Orders";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid": return "text-green-600 bg-green-50";
      case "Failed": return "text-red-600 bg-red-50";
      case "Pending": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "text-green-600 bg-green-50";
      case "Shipped": return "text-blue-600 bg-blue-50";
      case "Processing": return "text-yellow-600 bg-yellow-50";
      case "Cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPaymentIcon = (status) => {
    switch (status) {
      case "Paid": return <FaCheckCircle className="w-4 h-4" />;
      case "Failed": return <FaExclamationCircle className="w-4 h-4" />;
      case "Pending": return <FaClock className="w-4 h-4" />;
      default: return <FaCreditCard className="w-4 h-4" />;
    }
  };


  if (filteredOrders.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {filter === "all" ? "No orders yet" : `No ${filter.toLowerCase()} orders`}
        </h3>
        <p className="text-gray-500">
          {filter === "all" 
            ? "When you place orders, they'll appear here" 
            : `You don't have any ${filter.toLowerCase()} orders`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getFilterDisplayText()}</h1>
        <p className="text-gray-600">
          {filter === "all" 
            ? "Track and manage your orders" 
            : `View your ${filter.toLowerCase()} orders`
          }
        </p>
        {filter !== "all" && (
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              Showing {filteredOrders.length} {filter.toLowerCase()} order{filteredOrders.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((orderGroup, index) => {
          const order = orderGroup[0]; // Get order details from first item
          
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">Ordered:</span>
                      <span className="ml-1">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <FaTruck className="w-4 h-4 mr-2 text-gray-400" />
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    {order.orderStatus !== "Cancelled" && (
                      <div className="flex items-center text-sm">
                      {getPaymentIcon(order.paymentStatus)}
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    )}
                  </div>

                  <div className="flex items-center text-lg font-bold text-gray-900">
                    <FaRupeeSign className="w-4 h-4 mr-1" />
                    {order.totalAmount?.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div className="p-6">
                {/* Mobile View - Card Layout */}
                <div className="lg:hidden space-y-4">
                  {orderGroup.map((product) => (
                    <div key={product.productId} className="flex items-center bg-gray-50 rounded-xl p-4">
                      <div className="flex-shrink-0">
                        <img
                          src={product.productDetails.images?.[0]}
                          alt={product.productDetails.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {product.productDetails.title}
                        </h4>
                        <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View - List Layout */}
                <div className="hidden lg:block">
                  <div className="overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Product</th>
                          <th className="text-center py-3 px-2 font-semibold text-gray-700">Quantity</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orderGroup.map((product) => (
                          <tr key={product.productId} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-4 px-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src={product.productDetails.images?.[0]}
                                    alt={product.productDetails.title}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                </div>
                                <div className="ml-4">
                                  <h4 className="font-medium text-gray-900 line-clamp-1">
                                    {product.productDetails.title}
                                  </h4>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {product.quantity}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Expected Delivery (if available) */}
                {order.deliveryDate && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaTruck className="w-4 h-4 mr-2 text-green-500" />
                      <span>Expected delivery by: </span>
                      <span className="font-medium ml-1">
                        {new Date(order.deliveryDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;