import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import Maincarousel from "./Maincarousel";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  const closeSidebar = () => {
    toggleSidebar(); // Close the sidebar
  };

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  const categories = [
    {
      name: "Woman's Fashion",
      subcategories: [
        { name: "Dresses", link: "/women/dresses" },
        { name: "Pants", link: "/women/pants" },
        { name: "Footwear", link: "/women/footwear" },
      ],
    },
    {
      name: "Men's Fashion",
      subcategories: [
        { name: "Dresses", link: "/men/dresses" },
        { name: "Pants", link: "/men/pants" },
        { name: "Footwear", link: "/men/footwear" },
      ],
    },
  ];

  const otherLinks = [
    { name: "Electronics", link: "/electronics" },
    { name: "Home & Lifestyle", link: "/homelifestyle" },
    { name: "Medicine", link: "/medicine" },
    { name: "Sports & Outdoor", link: "/sports" },
    { name: "Baby's", link: "/baby" },
    { name: "Groceries", link: "/groceries" },
    { name: "Health & Beauty", link: "/health" },
  ];

  return (
    <div className="bg-white">I
      {/* Container with max width for centering content on large screens */}
      <div className="max-w-[1530px] mx-auto bg-white ">
        <div className="flex h-auto w-full  mt-32 md:mt-28 mb-5 md:mb-16">
          {/* Sidebar Section */}
          <div className="relative md:mt-5">
            {/* Overlay */}
            {isOpen && (
              <div
                onClick={closeSidebar}
                className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
              ></div>
            )}

            {/* Sidebar */}
            <div
              className={`flex flex-col bg-white text-black w-auto h-[400px] border-l-2 border-r-2 border-gray-300 space-y-3 py-3 px-2 absolute inset-y-0 left-0 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-200 ease-in-out z-30 md:relative md:translate-x-0`}
            >
              <nav className="flex flex-col space-y-2 md:w-60 xl:w-80 xl:ml-24">
                {/* Category Dropdown */}
                {categories.map((category, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => toggleCategory(index)}
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-200 rounded-md text-base font-medium"
                    >
                      <span>{category.name}</span>
                      <FaChevronDown
                        className={`transform ${
                          openCategoryIndex === index ? "rotate-180" : "rotate-0"
                        } transition-transform`}
                      />
                    </button>
                    {openCategoryIndex === index && (
                      <div className="absolute left-0 w-full bg-white border-t-2 border-gray-300 mt-2 pb-2 shadow-lg z-40">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subcategory.link}
                            onClick={closeSidebar}
                            className="block px-4 py-1 hover:bg-gray-200 rounded-md text-base font-medium"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Other Links */}
                {otherLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="flex items-center space-x-2 px-4 py-1 hover:bg-gray-200 rounded-md text-base font-medium"
                    onClick={closeSidebar}
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex justify-center md:justify-start  items-center md:ml-14 xl:mx-16 xl:my-11 h-auto w-full max-w-full">
            <Maincarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;