import React from 'react'

const slides = [
    {
      id: 1,
      image: "../../assets/Salescarousel/slide1.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.5,
    },
    {
      id: 2,
      image: "../../assets/Salescarousel/slide2.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.6,
    },
    {
      id: 3,
      image: "../../assets/Salescarousel/slide3.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.1,
    },
    {
      id: 4,
      image: "../../assets/Salescarousel/slide4.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.9,
    },
  ];
const Cart = () => {
return (
    <div className="bg-[#f9f6f2]">
        <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-36  px-4 sm:px-6">
            <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 sm:py-6">
                <h2 className='text-md sm:text-xl pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-9 sm:py-3'>Cart</h2>
                
                {/* Header Grid */}
                <div className='grid grid-cols-4 md:grid-cols-5 gap-4 pl-5 sm:pl-12 md:pl-14 xl:pl-24 py-1 sm:py-9'>
                    <p className='text-sm sm:text-xl md:col-span-2'>Product</p>
                    <p className='text-sm sm:text-xl text-center'>Price</p>
                    <p className='text-sm sm:text-xl text-center'>Quantity</p>
                    <p className='text-sm sm:text-xl text-center'>Subtotal</p>
                </div>
                
                {/* Product Items Grid */}
                <div className='pl-5 sm:pl-12 md:pl-14 xl:pl-24 py-4 sm:py-9'>
                    {slides.map((slide) => (
                        <div key={slide.id} className='grid grid-cols-4 md:grid-cols-5 gap-4 items-center mb-6 md:mb-12'>
                            <div className='md:flex items-center gap-4 col-span-1 md:col-span-2'>
                                <img src={slide.image} alt={slide.title} className='w-12 h-12 md:w-16 md:h-16' />
                                <h3 className='text-sm sm:text-lg truncate overflow-hidden py-2 md:p-4'>{slide.title}</h3>
                            </div>
                            <p className='text-sm sm:text-base text-center truncate'>
                                {slide.price}
                            </p>
                            <div className='flex justify-center items-center'>
                                <div className='flex justify-between items-center border border-gray-300 rounded'>
                                    <button className='px-2 py-1 text-gray-500 hover:bg-gray-100' 
                                        onClick={(e) => {const input = e.target.nextElementSibling;
                                            if (parseInt(input.value) > 1) {input.value = parseInt(input.value) - 1;}}}>-</button>
                                    <input 
                                        type="number" 
                                        defaultValue="1" 
                                        min="1"
                                        className='w-4 sm:w-10 text-center focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' 
                                        readOnly
                                    />
                                    <button 
                                        className='px-2 py-1 text-gray-500 hover:bg-gray-100'
                                        onClick={(e) => {
                                            const input = e.target.previousElementSibling;
                                             input.value = parseInt(input.value) + 1;}}>+</button>
                                </div>
                            </div>
                            <p className='text-xs sm:text-base text-center truncate'>{slide.price}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-3 sm:py-0'>
                     <button className='text-sm md:text-base font-light md:font-medium border border-gray-500  px-4 py-2 sm:px-12 sm:py-4 rounded-[4px]'>Return To Shop</button>
                     <button className='text-sm md:text-base font-light md:font-medium border border-gray-500  px-4 py-2 sm:px-12 sm:py-4 rounded-[4px]'>Update cart</button>
                </div>
                <div className='flex justify-between flex-wrap pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-3 sm:py-4'>
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
                    <div className='w-[400px] h-[276px] md:w-[470px] md:h-[324px] border border-gray-700 rounded-[4px] md:ml-3 p-4 sm:p-6 mt-6 sm:mt-10'>
                        <h4 className='text-lg font-medium'>Cart total</h4>
                        <div className='flex justify-between my-3'>
                            <p className='text-sm sm:text-base'>Subtotal:</p>
                            <p className='text-sm sm:text-base'>₹ 1,499</p>
                        </div>
                        <hr className="my-3 border border-gray-300" />
                        <div className='flex justify-between my-3'>
                            <p className='text-sm sm:text-base'>Shipping</p>
                            <p className='text-sm sm:text-base'>Free</p>
                        </div>
                        <hr className='my-3 border border-gray-300' />
                        <div className='flex justify-between my-3'>
                            <p className='text-sm sm:text-base'>Total:</p>
                            <p className='text-sm sm:text-base font-bold'>₹ 1,499</p>
                        </div>
                        <div className='flex justify-center mt-6'>
                            <button className='text-sm md:text-base font-medium bg-red-500 text-white px-4 py-2 rounded-[4px]'>
                                Procees to checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Cart
