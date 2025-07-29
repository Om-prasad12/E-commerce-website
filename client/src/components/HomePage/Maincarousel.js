import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Maincarousel({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  
  const [mainContent, setMainContent] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setMainContent(data);
    } else {
      // console.error("No data available for the carousel.");
    }
  }, [data]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);
   
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className="embla mt-4 max-w-full w-[90vw] sm:w-[80vw] md:w-[60vw] xl:w-[892px]"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {mainContent.map((slide) => (
            <div
              key={slide.id}
              className="embla__slide flex-none w-[80vw] md:w-[60vw] xl:w-[892px] bg-black border-2 aspect-[259/100] 
              min-h-[230px] sm:min-h-[250px] md:min-h-[300px] xl:min-h-[350px] relative overflow-hidden rounded-lg"
            >
              {/* Left side content */}
              <div className="flex flex-col justify-center items-center text-center ml-6 sm:ml-8 md:ml-6 lg:ml-12 text-white z-10 relative w-full md:w-1/2 h-full pr-4 md:pr-0">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 leading-tight drop-shadow-lg">
                  {slide.product.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl mb-4 opacity-90 drop-shadow-md">
                  {slide.product.promoTagline}
                </p>
                <button 
                  onClick={() => navigate(`/product/${slide.product._id}`)}
                  className="mt-4 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl underline flex items-center hover:opacity-80 transition-opacity drop-shadow-md"
                >
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

              {/* Right side image */}
              <div 
                className="absolute right-0 top-0 w-1/2 md:w-1/2 lg:w-2/5 h-full bg-cover bg-center bg-no-repeat md:block hidden"
                style={{
                  backgroundImage: slide.product.images && slide.product.images[0] 
                    ? `url(${slide.product.images[0]})` 
                    : 'none'
                }}
              ></div>

              {/* Mobile full background image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
                style={{
                  backgroundImage: slide.product.images && slide.product.images[0] 
                    ? `url(${slide.product.images[0]})` 
                    : 'none'
                }}
              ></div>

              {/* Mobile responsive overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent"></div>

              {/* Carousel Dots - Inside each slide */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {mainContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedIndex ? 'bg-red-500' : 'bg-white/50'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}