import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Maincarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const slides = [
    {
      id: 1,
      backgroundImage: 'url("../../assets/Maincarousel/image1.jpg")',
      logo: "../../assets/Maincarousel/apple-logo.png",
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
    },
    {
      id: 2,
      backgroundImage: 'url("../../assets/Maincarousel/image1.jpg")',
      logo: "../../assets/Maincarousel/apple-logo.png",
      title: "Galaxy S21 Series",
      subtitle: "Limited Time Offer",
    },
    {
      id: 3,
      backgroundImage: 'url("../../assets/Maincarousel/image1.jpg")',
      logo: "../../assets/Maincarousel/apple-logo.png",
      title: "OnePlus 9 Pro",
      subtitle: "Exclusive Discount",
    },
  ];

  return (
    <div
      className="embla mt-4 max-w-full w-[90vw] sm:w-[80vw] md:w-[60vw] xl:w-[892px]"
      ref={emblaRef}
    >
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="embla__slide flex-none w-[80vw] md:w-[60vw] xl:w-[892px] bg-cover bg-center border-2 aspect-[259/100] 
            min-h-[230px] sm:min-h-[250px] md:min-h-[300px] xl:min-h-[350px]" // Ensuring a minimum height
            // style={{ backgroundImage: slide.backgroundImage }}
          >
            <div className="flex flex-col justify-center ml-6 sm:ml-8 md:ml-12 text-black">
              <img
                src={slide.logo}
                alt={`${slide.title} Logo`}
                className="w-8 h-8 mb-3"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl">
                {slide.subtitle}
              </p>
              <button className="mt-4 text-sm sm:text-base md:text-lg xl:text-xl underline flex items-center">
                Shop Now{" "}
                <span className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
