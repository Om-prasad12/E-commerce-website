import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Maincarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <div
      className="embla-1 mt-4 max-w-full max-h-full w-[90vw] h-[30vh] sm:w-[80vw] sm:h-[40vh] md:w-[60vw] md:h-[50vh] xl:w-[850px] xl:h-[344px]"
      ref={emblaRef}
    >
      <div className="embla__container-1 flex">
        <div
          className="embla__slide flex-none w-[90vw] h-[30vh] sm:w-[80vw] sm:h-[40vh] md:w-[60vw] md:h-[50vh] xl:w-[850px] xl:h-[344px] flex justify-center items-center border-2"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #000",
          }}
        >
          Slide 1
        </div>
        <div
          className="embla__slide flex-none w-[90vw] h-[30vh] sm:w-[80vw] sm:h-[40vh] md:w-[60vw] md:h-[50vh] xl:w-[850px] xl:h-[344px] flex justify-center items-center border-2"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #000",
          }}
        >
          Slide 2
        </div>
        <div
          className="embla__slide flex-none w-[90vw] h-[30vh] sm:w-[80vw] sm:h-[40vh] md:w-[60vw] md:h-[50vh] xl:w-[850px] xl:h-[344px] flex justify-center items-center border-2"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #000",
          }}
        >
          Slide 3
        </div>
      </div>
    </div>
  );
}
