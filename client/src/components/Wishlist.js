import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";

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
    {
      id: 5,
      image: "../../assets/Salescarousel/slide2.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 3.9,
    },
    {
      id: 6,
      image: "../../assets/Salescarousel/slide4.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.9,
    },
    {
      id: 7,
      image: "../../assets/Salescarousel/slide3.png",
      discount: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: "₹ 1,499",
      actualPrice: "₹ 2,499",
      ratings: 4.1,
    },
  ];
const Wishlist = () => {
return (
    <div className="bg-[#f9f6f2] ">
        <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-36 xl:mt-40 px-4 sm:px-6">
            <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"> 
                    <h2 className="text-xl sm:text-2xl font-medium">Wishlist</h2>
                    <button className="text-black text-sm sm:text-base px-4 py-2 w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200 transition">
                        Move all to bag 
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full sm:w-[90%] md:w-[95%] mx-auto 
            max-w-[400px] sm:max-w-[600px] md:max-w-none pb-8">
                {slides.map((data) => {
                    const { id, image, discount, title, price, actualPrice, ratings } = data;
                    return (
                        <div className="w-full aspect-[4/3] sm:aspect-[3/4]" key={id}>
                            <div className="border-2 rounded-md overflow-hidden relative h-full flex flex-col">
                                {/* Discount Label */}
                                {discount && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs sm:text-sm font-bold">
                                        {discount}
                                    </div>
                                )}
                                
                                {/* Delete Icon */}
                                <div className="absolute top-2 right-2">
                                    <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:text-red-500 transition">
                                        <RiDeleteBin6Line className="text-sm sm:text-base" />
                                    </button>
                                </div>

                                {/* Product Image */}
                                <div className="flex justify-center items-center  p-4 sm:p-6 md:p-8 bg-gray-100 flex-grow">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-[120px] sm:w-[120px] md:w-[150px] xl:w-[172px]  aspect-[4/3]"
                                    />
                                </div>
                                
                                {/* Add to Cart Button */}
                                <div className="mt-auto">
                                    <button className="bg-black text-white px-3 py-2 w-full flex items</div>-center justify-center gap-2 text-sm sm:text-base transition hover:bg-gray-800">
                                        <IoCartOutline className="text-lg" /> Add to Cart
                                    </button>
                                </div>
                                
                                {/* Price Section */}
                                <div className="px-3 py-2 bg-white">
                                    <p className="text-xs sm:text-sm truncate">{title}</p>
                                    <div className="flex items-center mt-1">
                                        <div className="text-red-500 text-sm sm:text-base font-bold mr-2">
                                            {price}
                                        </div>
                                        {actualPrice && (
                                            <div className="text-gray-400 text-xs sm:text-sm line-through">
                                                {actualPrice}
                                            </div>
                                        )}
                                    </div>

                                    {/* Ratings */}
                                    <div className="flex space-x-1 w-auto h-auto mt-1">
                                        {/* Rating stars could be added here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);
};

export default Wishlist;
