import React from "react";
import styles from "./ComponentCss/CategoryCarousel.module.css";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./SalesCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CategoryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    loop: true,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const slides = [
    {
      id: 1,
      image: "../../assets/CategoryCarousel/Cellphone.svg",
      title: "Camera",
      link: "/product/1",
    },
    {
      id: 2,
      image: "../../assets/CategoryCarousel/slide2.png",
      title: "Mobile",
      link: "/product/2",
    },
    {
      id: 3,
      image: "../../assets/CategoryCarousel/slide3.png",
      title: "Computers",
      link: "/product/3",
    },
    {
      id: 4,
      image: "../../assets/CategoryCarousel/slide4.png",
      title: "Games",
      link: "/product/4",
    },
    {
      id: 5,
      image: "../../assets/CategoryCarousel/slide5.png",
      title: "Heardphones",
      link: "/product/5", 
    },
    {
      id: 6,
      image: "../../assets/CategoryCarousel/slide6.png",
      title: "Smart Watches",
      link: "/product/6",
    },
    {
      id: 7,
      image: "../../assets/CategoryCarousel/slide3.png",
      title: "Computers",
      link: "/product/7",
    },
  ];

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="bg-gray-100 xl:bg-gray-300">
      {/* Container with max width for centering content on large screens */}
      <div className="max-w-[1530px] mx-auto bg-white">
        <>
          <section className={`${styles.embla} w-[90%] sm:w-[80%] m-auto mb-10 xl:mb-14`}>
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
                    Categories
                  </p>
                </div>
                <div className=" md:mt-4">
                  <p className="text-2xl md:text-4xl font-semibold tracking-wide mt-2 mr-3 md:mr-5 xl:mr-6">
                  Browse By Category
                  </p>
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
                  const { id, image, title, link } = data;
                  return (
                    <div
                      className={`${styles.embla__slide} hover:bg-white`}
                      key={id}
                      onClick={() => navigate(link)} // Use navigate for routing
                    >
                      <div className="border-2 h-[156px] w-[176px] overflow-hidden flex flex-col justify-center items-center group hover:bg-red-500">
                        <img src={image} alt="slide" className="w-[56px] h-[56px] filter group-hover:invert" />
                        <p className="text-base mt-2 group-hover:text-white">{title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <hr className="w-10/12 mx-auto border-gray-400 mb-5 md:mb-20" />
        </>
      </div>
    </div>
  );
};

export default CategoryCarousel;
