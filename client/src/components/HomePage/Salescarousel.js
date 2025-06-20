import React from "react";
import styles from "./ComponentCss/Salescarousel.module.css";
import { CiHeart } from "react-icons/ci";
import Stars from "./Stars";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./SalesCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import CountdownTimer from "./CountdownTimer";

const Salescarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    loop: true,
  });

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
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
    <div className="bg-gray-100 xl:bg-gray-300">
      {/* Container with max width for centering content on large screens */}
      <div className="max-w-[1530px] mx-auto bg-white ">
    <section
      className={`${styles.embla} w-[90vw] sm:w-[80vw] m-auto md:w-full  md:pl-16 xl:pl-32 `}
    >
      <div className="flex justify-between h-auto">
        <div className="">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="40"
              viewBox="0 0 20 40"
              fill="none"
            >
              <rect width="20" height="40" rx="4" fill="#DB4444" />
            </svg>
            <p
              className="mt-2 mx-1 xl:m-3 text-base font-semibold"
              style={{ color: "#DB4444" }}
            >
              Today’s
            </p>
          </div>
          <div className="flex flex-wrap  md:mt-4">
            <p className="text-2xl md:text-4xl font-semibold tracking-wide mt-2 mr-3 md:mr-5 xl:mr-6">
              Flash Sales
            </p>
            <CountdownTimer targetDate="2025-06-18T00:00:00" />
          </div>
        </div>
        <div className={`${styles.embla__controls} mr-3`}>
          <div className={styles.embla__buttons}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.embla__viewport} mt-8`} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((data) => {
            const { id, image, discount, price, actualPrice, ratings } = data;

            return (
              <div className={styles.embla__slide} key={id}>
                <div className=" border-2  rounded-lg overflow-hidden relative">
                  {/* Discount Label */}
                  {discount && (
                    <div className="absolute top-2 mx-2 bg-red-500 text-white px-3 py-1 text-base rounded-md font-bold">
                      {discount}
                    </div>
                  )}
                  {/* Icons */}
                  <div className="absolute top-2 right-1 flex space-x-2">
                    <button className="p-2 bg-white rounded-full shadow">
                      <CiHeart />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center items-center p-10 md:p-10 xl:p-12 bg-gray-100">
                    <img
                      src={image}
                      alt="product"
                      className="w-[100px]  sm:w-[120px]  md:w-[150px]  xl:w-[172px]  aspect-[113/100]"
                    />
                  </div>

                  {/* Price Section */}
                  <div className="px-3 py-2 bg-white">
                    <div className="flex">
                      <div className="text-red-500 text-lg font-bold m-2">
                        {price}
                      </div>
                      {actualPrice && (
                        <div className="text-gray-400 text-lg line-through m-2">
                          {actualPrice}
                        </div>
                      )}
                    </div>

                    {/* Ratings */}
                    <div className="flex space-x-1 w-auto h-auto">
                      <Stars  ratings={ratings} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button className=" bg-red-500 text-white font-semibold text-sm md:text-lg px-10 md:px-12 py-4  my-10 xl:my-14" >View All Products</button>
      </div>
    </section>
    <hr className=" w-10/12   mx-auto border-gray-400 mb-5 md:mb-20" />
    </div>
    </div>
    
    </>
  );
};

export default Salescarousel;
