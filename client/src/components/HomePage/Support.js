import React from 'react'

const Support = () => {
  return (
    <div className="flex flex-col md:flex-row md:w-3/5 m-auto justify-between items-center py-8 px-4 md:px-16 gap-6">
      {/* Feature 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black">
          <img src="../../assets/Support/delivery.png" alt="Fast Delivery" className="w-8 h-8" />
        </div>
        <h3 className="mt-4 font-semibold text-lg">Free and Fast Delivery</h3>
        <p className="text-gray-500 text-sm">Free delivery for all orders over ₹1400</p>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black">
          <img src="../../assets/Support/Customerservice.png" alt="Customer Support" className="w-8 h-8" />
        </div>
        <h3 className="mt-4 font-semibold text-lg">24/7 Customer Service</h3>
        <p className="text-gray-500 text-sm">Friendly 24/7 customer support</p>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black">
          <img src="../../assets/Support/secure.png" alt="Money-Back Guarantee" className="w-8 h-8" />
        </div>
        <h3 className="mt-4 font-semibold text-lg">Money-Back Guarantee</h3>
        <p className="text-gray-500 text-sm">We return money within 30 days</p>
      </div>
    </div>
  )
}

export default Support
