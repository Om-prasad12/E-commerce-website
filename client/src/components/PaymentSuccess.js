import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // ✅ Step 1: Verify payment and parse metadata
useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  if (sessionId && !sessionStorage.getItem(`order-${sessionId}`)) {  // ✅ add this check
    axios.get(`${process.env.REACT_APP_API_BASE_URL}payment/verify-payment?session_id=${sessionId}`)
      .then(res => {
        const parsedOrder = JSON.parse(res.data.session.metadata.orderData);
        if (res.data.session.metadata.userId) parsedOrder.user = res.data.session.metadata.userId;

        setOrderData(parsedOrder);

        // ✅ mark this session as processed so reload won't create a duplicate
        sessionStorage.setItem(`order-${sessionId}`, "true");
      })
      .catch(err => {
        console.error("Error verifying payment:", err);
      });
  }
}, [location]);


useEffect(() => {
  const addOrder = async () => {
    try {
      const updatedOrder = { ...orderData, paymentStatus: "Paid" };
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}order`,
        updatedOrder,
        { withCredentials: true }
      );
      setOrderId(res.data.order._id);
    } catch (error) {
      console.error("Error processing Bank order:", error);
    }
  };

  if (orderData) {
    addOrder();
  }
}, [orderData, navigate]);



useEffect(() => {
    const addOrderToUser = async (orderId) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}user/orders`,
          { orderId: orderId },
          { withCredentials: true }
        );
        toast.success("Order added to user profile");
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    if (orderId) {
      addOrderToUser(orderId);
    }
  }, [orderId]);


  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 pt-10 ">
          <div className="text-center py-16">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-gray-500">Your payment has been processed successfully</p>
        </div>

        <div className="bg-[#f9f6f2] rounded-lg p-6 max-w-md mx-auto mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">What's Next?</h3>
          <p className="text-gray-600 text-sm">
            You will receive an email confirmation with your order details and tracking information.
          </p>
        </div>

        <div className="space-y-4">
          {orderId && (
            <button
        onClick={() => navigate(`/orders/${orderId}`)}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 mx-2"
            >
        View Order Details
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 mx-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
