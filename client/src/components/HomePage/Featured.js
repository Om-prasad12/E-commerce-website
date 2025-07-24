import React,{useState,useEffect}from 'react'
import { Link } from "react-router-dom";

const Featured = ({data}) => {
   const [mainContent,setMainContent] = useState([]);
       
  useEffect(() => {
        if (data && data.length > 0) {
          setMainContent(data);
        } else {
          // console.error("No data available for the carousel.");
        }
  },[data])

  return (
    <>
      <div className="bg-gray-100 xl:bg-gray-300">
        {/* Container with max width for centering content on large screens */}
        <div className="max-w-[1530px] mx-auto bg-white">
          <section className={`w-[80%] m-auto mb-10  xl:mb-14`}>
            <div className="flex justify-between h-auto">
              <div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                  </svg>
                  <p className="mt-2 mx-1 xl:m-3 text-base font-semibold" style={{ color: "#DB4444" }}>
                   Featured
                  </p>
                </div>
                <div className="md:mt-4">
                  <p className="text-2xl md:text-4xl font-semibold tracking-wide mt-2 mr-3 md:mr-5 xl:mr-6">
                    New Arrivals
                  </p>
                </div>
              </div>
           </div>
           <div className="my-6 ">
              <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6 w-full h-auto mt-5 md:mt-10 md:h-[550px]">
                
                {/* Large featured item */}
                <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-center" 
                  style={{ backgroundImage: "url('../../assets/Featured/PS5.png')" }}>
                  <h2 className="text-xl font-semibold">PlayStation 5</h2>
                  <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                  <Link to='/' className="text-white underline mt-2">Shop Now</Link>
                </div>

                {/* Women's Collections */}
                <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-right" 
                  style={{ backgroundImage: "url('../../assets/Featured/Women.png')" }}>
                  <h2 className="text-xl font-semibold">Women's Collections</h2>
                  <p className="text-sm w-1/2">Featured woman collections that give you another vibe.</p>
                  <Link to='/' className="text-white underline mt-2">Shop Now</Link>
                </div>

                {/* Speakers */}
                <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-center" 
                  style={{ backgroundImage: "url('../../assets/Featured/Speaker.png')" }}>
                  <h2 className="text-lg font-semibold">Speakers</h2>
                  <p className="text-sm">Amazon wireless speakers</p>
                  <Link to='/' className="text-white underline mt-2">Shop Now</Link>
                </div>

                {/* Perfume */}
                <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 bg-black text-white flex flex-col justify-end p-6 bg-contain bg-no-repeat bg-center" 
                  style={{ backgroundImage: "url('../../assets/Featured/Perfume.png')" }}>
                  <h2 className="text-lg font-semibold">Perfume</h2>
                  <p className="text-sm">GUCCI INTENSE OUD EDP</p>
                  <Link to='/' className="text-white underline mt-2">Shop Now</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Featured
