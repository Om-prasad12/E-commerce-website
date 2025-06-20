import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdMenu } from "react-icons/io";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "../App.css";

const Navbar = ({ toggleSidebar }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < 50) {
        setVisible(true);
      } else {
        setVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <>
      <div
        className={`fixed w-full z-50 top-0 transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Sale Banner */}
        <div className="flex w-full h-12 bg-black justify-center items-center p-3">
          <p className="text-xs md:text-sm text-white font-normal text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="text-amber-300 m-2">Shop Now</span>
          </p>
        </div>

        {/* Search bar (small screen) */}
        <div className="flex justify-between items-center bg-white z-50 sm:hidden">
          <div className="flex items-center gap-3 border-2 border-gray-500 w-11/12 max-w-[450px] mx-auto mt-2 mb-1 overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="p-2 w-full text-xs border-none focus:outline-none"
            />
            <IoMdSearch className="text-2xl cursor-pointer mr-2" />
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="flex justify-between items-center py-1 sm:py-4 pl-4 pr-4 md:px-20 xl:pl-32 xl:pr-24 bg-white drop-shadow-md z-50">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide w-64 rounded-md transition-all"
          >
            Exclusive
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden xl:flex items-center gap-12 font-medium">
            <li className="p-3 hover:bg-gray-200 rounded-md transition-all cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3 hover:bg-gray-200 rounded-md transition-all cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="p-3 hover:bg-gray-200 rounded-md transition-all cursor-pointer">
              <Link to="/about">About</Link>
            </li>
          </ul>

          {/* Right-side Icons & Search */}
          <div className="flex items-center gap-2 md:gap-4 relative">
            {/* Desktop search bar */}
            <div className="items-center hidden sm:flex gap-2 border-2 border-gray-500 px-2 rounded-md">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="p-2 w-52 xl:w-64 text-xs border-none focus:outline-none"
              />
              <IoMdSearch className="text-2xl cursor-pointer" />
            </div>

            {/* Icons */}
            <ul className="hidden md:flex items-center gap-4 xl:gap-6">
              <Link
                to="/wishlist"
                className="text-2xl hover:bg-gray-200 p-2 rounded-md transition-all"
              >
                <FaRegHeart />
              </Link>
              <Link
                to="/cart"
                className="text-2xl hover:bg-gray-200 p-2 rounded-md transition-all"
              >
                <RiShoppingCart2Line />
              </Link>
              <div
                className="text-2xl hover:bg-gray-200 p-2 rounded-md transition-all cursor-pointer"
                onClick={handleProfileMenuToggle}
              >
                <CgProfile />
              </div>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg opacity-95 z-50"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="xl:hidden text-2xl p-2"
            >
              <IoMdMenu />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {showMenu && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" />
            <ul
              ref={menuRef}
              className="fixed xl:hidden top-0 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg pt-20 pb-6 z-50"
              style={{ transform: showMenu ? "translateY(0)" : "translateY(-100%)" }}
            >
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/">Home</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/about">About</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
