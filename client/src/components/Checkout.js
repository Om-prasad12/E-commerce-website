import { React, useState, useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [saveInfoChecked, setSaveInfoChecked] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  //To fetch cart item and user adress if there is any
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
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}user/me`,
          { withCredentials: true }
        );
        setUserAddress(res.data.addresses[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCart();
    fetchUserData();
  }, []);

  //To calculate subtotal and total
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = item.productId.price || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems]);

  
  const handlePlaceOrder = async () => {
    //If the user want to save the address
    if (saveInfoChecked) {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}user/me`,
          { addresses: [userAddress] },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error updating user address:", error);
      }
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item.productId._id,
        vendorId: item.productId.userId,
        quantity: item.quantity,
      })),
      totalAmount: subtotal,
      shippingAddress: {
        street: userAddress.street,
        city: userAddress.city,
        pincode: userAddress.pincode,
        state: userAddress.state,
        country: "India",
      },
      paymentStatus: "Pending",
    };

    if (paymentMethod === "Bank") {
      orderData.paymentStatus = "Paid";
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}order`,
        orderData,
        { withCredentials: true }
      );
      setOrderId(res.data._id);
      toast.success("Order placed successfully");  
      navigate(`/order/${res.data.order._id}`);
    } catch (error) {
      console.error("Error processing COD order:", error);
      toast.error("Failed to place order");
      return;
    }
  };

  useEffect(() => {
    const addOrderToUser = async (orderId) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}user/orders`,
          { orderId:orderId },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to add order to user profile");
      }
    };
    if (orderId) {
      addOrderToUser(orderId);
    }
  }, [orderId]);

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-36  px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 sm:py-6">
          <h2 className="text-md sm:text-xl pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-9 sm:py-3">
            Checkout
          </h2>
        </div>
        <div className="sm:gap-6 w-full sm:w-[90%] md:w-[95%] mx-auto pb-8">
          <h1 className="text-4xl pl-3 sm:pl-8 md:pl-9 xl:pl-16">
            Billing Details
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between w-full">
            <div className="flex flex-col justify-center sm:justify-start mt-4 md:mt-8 md:w-auto">
              <label className=" text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16  mt-4 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.fullName}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, fullName: e.target.value })
                }
                required
              />
              <label className=" text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.street}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, street: e.target.value })
                }
                required
              />
              <label className=" text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1">
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.city}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, city: e.target.value })
                }
                required
              />
              <label className=" text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.state}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, state: e.target.value })
                }
                required
              />
              <label className="text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16  mt-4 mb-1">
                PIN Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.pincode}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, pincode: e.target.value })
                }
                required
              />
              <label className=" text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16"
                value={userAddress.phone}
                onChange={(e) =>
                  setUserAddress({ ...userAddress, phone: e.target.value })
                }
                required
              />
              <div className="flex items-center w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] mt-6 ml-3 sm:ml-8 md:ml-9 xl:ml-16 mb-4">
                <input
                  type="checkbox"
                  id="saveInfo"
                  className="w-4 h-4 accent-red-500"
                  checked={saveInfoChecked}
                  onChange={(e) => setSaveInfoChecked(e.target.checked)}
                />
                <label htmlFor="saveInfo" className="text-sm sm:text-base ml-3">
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
            <div className="mt-4 md:mt-8 flex flex-col  px-6  w-auto max-w-10/12 xl:min-w-1/2 xl:mx-auto">
              {cartItems.map((item) => {
                const product = item.productId;
                return (
                  <div
                    key={product._id}
                    className="grid grid-cols-3  gap-4 items-center mb-6 md:mb-8"
                  >
                    <div className="flex items-center gap-4 col-span-2">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-14 h-14 md:w-16 md:h-16"
                      />
                      <h3 className="text-sm sm:text-base flex justify-between  py-2 md:p-4">
                        <span className="truncate block max-w-[85%]">
                          {product.title}
                        </span>
                        <span className="whitespace-nowrap">
                          ({item.quantity})
                        </span>
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-end truncate">
                      {product.price}
                    </p>
                  </div>
                );
              })}
              <div className="grid grid-cols-2  gap-4 items-center border-b border-gray-400 pb-6 mt-4">
                <p className="text-sm sm:text-base">Subtotal:</p>
                <p className="text-sm sm:text-base text-end">
                  ₹{subtotal.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2  gap-4 items-center border-b border-gray-400 pb-6 mt-4">
                <p className="text-sm sm:text-base">Shipping:</p>
                <p className="text-sm sm:text-base text-end">Free</p>
              </div>
              <div className="grid grid-cols-2  gap-4 items-center pb-6 mt-4">
                <p className="text-sm sm:text-base">Total:</p>
                <p className="text-sm sm:text-base text-end">
                  ₹{subtotal.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-start">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bank"
                  className="w-4 h-4"
                  checked={paymentMethod === "Bank"}
                  onChange={() => setPaymentMethod("Bank")}
                />
                <p className="text-sm sm:text-base ml-3">Bank</p>
              </div>
              <div className="flex items-center justify-start">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  className="w-4 h-4"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <p className="text-sm sm:text-base ml-3">Cash on Delivery</p>
              </div>
              <div className="flex items-start mt-6 sm:mt-10">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border border-gray-300 px-3 py-2 rounded-[4px] mr-3 w-40 sm:w-64"
                />
                <button className="text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]">
                  Apply Coupon
                </button>
              </div>
              <div className="mt-6 sm:mt-10">
                <button
                  className="text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
