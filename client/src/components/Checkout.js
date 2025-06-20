import React from 'react'

const slides = [
    {
      id: 1,
      image: "../../assets/Salescarousel/slide1.png",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
    },
    {
      id: 2,
      image: "../../assets/Salescarousel/slide2.png",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
    },
  ];
const Checkout = () => {
return (
        <div className="bg-[#f9f6f2]">
                <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-36  px-4 sm:px-6">
                        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 sm:py-6">
                                        <h2 className='text-md sm:text-xl pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-9 sm:py-3'>Checkout</h2>
                        </div>
                        <div className="sm:gap-6 w-full sm:w-[90%] md:w-[95%] mx-auto pb-8">
                                        <h1 className='text-4xl pl-3 sm:pl-8 md:pl-9 xl:pl-16'>Billing Details</h1>
                                        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between w-full'>
                                           <div className='flex flex-col justify-center sm:justify-start mt-4 md:mt-8 md:w-auto'>
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16  mt-4 mb-1'>First Name <span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' required />
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1'>Last Name<span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' />
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1'>Street Address <span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' required />
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1'>Appartment,floor,etc. (optional)</label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' />
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1'>Town/City <span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' required />
                                            <label className=' text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16 mt-4 mb-1'>Phone Number <span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' required />
                                            <label className='text-md sm:text-lg pl-3 sm:pl-8 md:pl-9 xl:pl-16  mt-4 mb-1'>Email Address <span className="text-red-500">*</span></label>
                                            <input type="text" className='w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] border bg-[#F5F5F5] rounded-md p-2 ml-3 sm:ml-8 md:ml-9 xl:ml-16' required /> 
                                            <div className="flex items-center w-10/12 sm:w-[350px] md:w-[400px] xl:w-[470px] mt-6 ml-3 sm:ml-8 md:ml-9 xl:ml-16 mb-4">
                                              <input type="checkbox" id="saveInfo" className="w-4 h-4 accent-red-500"/>
                                              <label htmlFor="saveInfo" className="text-sm sm:text-base ml-3">
                                                Save this information for faster check-out next time
                                              </label>
                                            </div>
                                    </div>
                                    <div className='mt-4 md:mt-8 flex flex-col  px-6  w-auto max-w-10/12 xl:min-w-1/2 xl:mx-auto'>
                                        {slides.map((slide) => (
                                          <div key={slide.id} className='grid grid-cols-3  gap-4 items-center mb-6 md:mb-8'>
                                            <div className='flex items-center gap-4 col-span-2'>
                                                <img src={slide.image} alt={slide.title} className='w-14 h-14 md:w-16 md:h-16' />
                                                <h3 className='text-sm sm:text-base truncate overflow-hidden py-2 md:p-4'>{slide.title}</h3>
                                            </div>
                                            <p className='text-sm sm:text-base text-end truncate'>{slide.price}</p>
                                          </div>
                                        ))}
                                        <div className='grid grid-cols-2  gap-4 items-center border-b border-gray-400 pb-6 mt-4'>
                                          <p className='text-sm sm:text-base'>Subtotal:</p>
                                          <p className='text-sm sm:text-base text-end'>₹2,998</p>
                                        </div>
                                        <div className='grid grid-cols-2  gap-4 items-center border-b border-gray-400 pb-6 mt-4'>
                                          <p className='text-sm sm:text-base'>Shipping:</p>
                                          <p className='text-sm sm:text-base text-end'>Free</p>
                                        </div>
                                        <div className='grid grid-cols-2  gap-4 items-center pb-6 mt-4'>
                                          <p className='text-sm sm:text-base'>Total:</p>
                                          <p className='text-sm sm:text-base text-end'>₹2,998</p>
                                        </div>

                                        <div className='flex items-center justify-start'>
                                          <input type="radio" name="paymentMethod" value="bank" className='w-4 h-4' />
                                          <p className='text-sm sm:text-base ml-3'>Bank</p>
                                        </div>
                                        <div className='flex items-center justify-start'>
                                          <input type="radio" name="paymentMethod" value="cod" className='w-4 h-4' />
                                          <p className='text-sm sm:text-base ml-3'>Cash on Delivery</p>
                                        </div>
                                        <div className="flex items-start mt-6 sm:mt-10">
                                           <input type="text" placeholder="Coupon Code" 
                                            className="border border-gray-300 px-3 py-2 rounded-[4px] mr-3 w-40 sm:w-64"/>
                                           <button className="text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]">
                                             Apply Coupon
                                           </button>
                                        </div>
                                    </div>
                            </div>
                    </div>
            </div>
    </div>            
)
}

export default Checkout
