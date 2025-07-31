import React from "react";
import Support from "./HomePage/Support" ;
const slides = [
  {
    id: 1,
    image: "../../assets/About/shop.svg",
    title: "Sallers active our site",
    number: "10.5k",
  },
  {
    id: 2,
    image: "../../assets/About/sales.svg",
    title: "Mopnthly Produduct Sale",
    number: "33K",
  },
  {
    id: 3,
    image: "../../assets/About/shopping bag.svg",
    title: "Customer active in our site",
    number: "45.5K",
  },
  {
    id: 4,
    image: "../../assets/About/money.svg",
    title: "Anual gross sale in our site",
    number: "25K",
  },
];

const cards = [
  {
    id: 1,
    image: "../../assets/About/Tom Cruise.png",
    title: "Tom Cruise",
    post: "Founder & Chairman",
  },
  {
    id: 2,
    image: "../../assets/About/Emma Watson.png",
    title: "Emma Watson",
    post: "Managing Director",
  },
  {
    id: 3,
    image: "../../assets/About/Will Smith.png",
    title: "Will Smith",
    post: "Product Designer",
  },
];

const About = () => {
  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-screen-2xl mx-auto bg-white xl:shadow-lg mt-28 sm:mt-28 md:mt-32 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[98%] mx-auto py-4 sm:py-6">
          <h2 className="text-md sm:text-xl pl-3 sm:pl-8 md:pl-9 xl:pl-16 pt-9 sm:py-3">
            About
          </h2>
          {/* About page main content*/}
          <div className="flex flex-wrap justify-between pl-3 sm:pl-8 md:pl-9 xl:pl-16 py-4">
            <div className="w-full md:w-2/5 lg:w-1/3 lg:min-w-[380px] xl:min-w-[500px] mb-6 pr-3 ">
              <h3 className="text-5xl">Our Story</h3>
              <p className="text-base leading-[26px] mt-10">
                Launced in 2015, Exclusive is South Asia's premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.{" "}
              </p>
              <p className="text-base leading-[26px] mt-6">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
            <div className="w-full md:w-3/5 lg:min-w-[500px] lg:w-1/2">
              <img
                src="../../assets/About/About main.png"
                alt="img"
                className="w-full h-full max-w-[650px] mx-auto"
              />
            </div>
          </div>

          {/* Slides*/}
          <div className="flex flex-wrap justify-center gap-6 px-3 sm:px-8 md:px-4 xl:px-16 py-6 my-3 md:my-12">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="group h-[230px] w-[272px] border-2 border-gray rounded-md mb-6  flex flex-col items-center justify-center hover:bg-red-500 transition-colors duration-300"
              >
                <div className="w-[80px] h-[80px] shrink-0 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-black group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-10 h-10 object-contain group-hover:invert transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="text-center mt-4 group-hover:text-white transition-colors duration-300">
                  <h3 className="text-3xl font-semibold">{slide.number}</h3>
                  <p className="text-base ">{slide.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cards section */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4 md:px-2 lg:px-10 xl:px-20 max-w-[1600px] mx-auto">
            {cards.map((slide) => (
              <div
                key={slide.id}
                className="w-[300px] h-[450px] sm:w-[250px] sm:h-[400px] md:w-[220px] md:h-[450px] lg:w-[330px] lg:h-[500px] xl:w-[370px] xl:h-[500px] border border-gray-300 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Image container */}
                <div className="flex items-end justify-center bg-[#F5F5F5] h-[330px] w-[300px] sm:h-[280px] sm:w-[250px] md:h-[330px] md:w-[220px] lg:h-[380px] lg:w-[330px] xl:h-[380px] xl:w-[370px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-contain w-[190px] h-[280px] sm:w-[170px] sm:h-[230px] md:w-[180px] md:h-[280px] lg:w-[236px] lg:h-[330px] xl:w-[320px] xl:h-[330px]"/>
                </div>
                {/* Title & post */}
                <div className="mt-4 text-center px-3 pb-4">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {slide.post}
                  </p>
                </div>
              </div>
            ))}
          </div>
            
        </div>
        <Support />
      </div>
    </div>
  );
};

export default About;
