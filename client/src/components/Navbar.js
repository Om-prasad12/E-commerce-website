import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoMdSearch, IoMdMenu } from "react-icons/io";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import SearchSuggestions from "./SearchSuggestions";
import "../App.css";

const Navbar = ({ toggleSidebar, loggedIn, setLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  
  // States for suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Handle main search function with skipLoader
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}prod/search?q=${encodeURIComponent(query)}`,
        { 
          withCredentials: true,
          skipLoader: true // This will prevent the main app loader from showing
        }
      );

      navigate('/search', { 
        state: { 
          searchResults: response.data.products,
          searchQuery: query,
          totalResults: response.data.products.length
        } 
      });
    } catch (error) {
      console.error('Search error:', error);
      navigate('/search', { 
        state: { 
          searchResults: [],
          searchQuery: query,
          totalResults: 0
        } 
      });
    }
  };

  // Get suggestions from backend with skipLoader
  const getSuggestions = useCallback(async (query) => {
    if (!query.trim() || query.length < 2) {
      return [];
    }
    
    try {
      setSuggestionLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}prod/suggestions?q=${encodeURIComponent(query)}`,
        { 
          withCredentials: true,
          skipLoader: true // This will prevent the main app loader from showing
        }
      );
      
      setSuggestionLoading(false);
      return response.data.suggestions || [];
    } catch (error) {
      console.error('Suggestions error:', error);
      setSuggestionLoading(false);
      return [];
    }
  }, []);

  // Debounce function to avoid too many API calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Debounced suggestion function
  const debouncedGetSuggestions = useCallback(
    debounce(async (query, isMobile) => {
      const newSuggestions = await getSuggestions(query);
      
      if (isMobile) {
        setMobileSuggestions(newSuggestions);
        setShowMobileSuggestions(newSuggestions.length > 0);
      } else {
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0);
      }
    }, 300), // 300ms delay
    [getSuggestions]
  );

  // Handle desktop search input change
  const handleDesktopInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      debouncedGetSuggestions(value, false);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle mobile search input change
  const handleMobileInputChange = (e) => {
    const value = e.target.value;
    setMobileSearchQuery(value);
    
    if (value.length >= 2) {
      debouncedGetSuggestions(value, true);
    } else {
      setMobileSuggestions([]);
      setShowMobileSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/product/${product._id}`); // Use _id for MongoDB
    setSearchQuery("");
    setMobileSearchQuery("");
    setShowSuggestions(false);
    setShowMobileSuggestions(false);
  };

  // Handle desktop search
  const handleDesktopSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  // Handle mobile search
  const handleMobileSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch(mobileSearchQuery);
      setMobileSearchQuery("");
      setShowMobileSuggestions(false);
    }
  };

  // Handle search icon click
  const handleSearchIconClick = (isMobile = false) => {
    const query = isMobile ? mobileSearchQuery : searchQuery;
    handleSearch(query);
    if (isMobile) {
      setMobileSearchQuery("");
      setShowMobileSuggestions(false);
    } else {
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowMobileSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout= () =>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}auth/logout`, {
      withCredentials: true
    }).then((res) => {
      setLoggedIn(false);
      navigate("/");
    }).catch((err) => {
      console.error("Logout error:", err);
    });
  }

  // Check if user is logged in
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}auth/isloggedin`, {
     withCredentials: true
    }).then((res) => {
      setLoggedIn(res.data.loggedIn);
      })
      .catch(() => {
      setLoggedIn(false);
      });
  },[]);

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

        {/* Search bar (small screen) - FIXED FOR MOBILE */}
        <div className="flex justify-between items-center bg-white z-50 sm:hidden">
          <div 
            ref={mobileSearchRef}
            className="flex items-center gap-3 border-2 border-gray-500 w-11/12 max-w-[450px] mx-auto mt-2 mb-1 rounded-md relative"
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className="p-2 w-full text-xs border-none focus:outline-none"
              value={mobileSearchQuery}
              onChange={handleMobileInputChange}
              onKeyPress={handleMobileSearch}
              onFocus={() => mobileSearchQuery.length >= 2 && setShowMobileSuggestions(true)}
            />
            <IoMdSearch 
              className="text-2xl cursor-pointer mr-2" 
              onClick={() => handleSearchIconClick(true)}
            />
            
            {/* Mobile Suggestions - Now properly positioned */}
            {showMobileSuggestions && (
              <div className="absolute top-full left-0 right-0 z-[60] mt-1">
                <SearchSuggestions
                  suggestions={mobileSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  onSearchClick={(query) => {
                    handleSearch(query);
                    setShowMobileSuggestions(false);
                  }}
                  searchQuery={mobileSearchQuery}
                  isLoading={suggestionLoading}
                  isMobile={true}
                />
              </div>
            )}
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
            <div 
              ref={searchRef}
              className="items-center hidden sm:flex gap-2 border-2 border-gray-500 px-2 rounded-md relative"
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                className="p-2 w-52 xl:w-64 text-xs border-none focus:outline-none"
                value={searchQuery}
                onChange={handleDesktopInputChange}
                onKeyPress={handleDesktopSearch}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              />
              <IoMdSearch 
                className="text-2xl cursor-pointer" 
                onClick={() => handleSearchIconClick(false)}
              />
              
              {/* Desktop Suggestions - Original design preserved */}
              {showSuggestions && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                  onSearchClick={(query) => {
                    handleSearch(query);
                    setShowSuggestions(false);
                  }}
                  searchQuery={searchQuery}
                  isLoading={suggestionLoading}
                  isMobile={false}
                />
              )}
            </div>

            {/* Icons */}
            <ul className="hidden md:flex items-center gap-4 xl:gap-6">
              {loggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <div
                    className="text-2xl hover:bg-gray-200 p-2 rounded-md transition-all cursor-pointer"
                    onClick={handleProfileMenuToggle}
                  >
                    <CgProfile />
                  </div>
                </>
              )}

              {showProfileMenu && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg opacity-95 z-50"
                  onClick={() => setShowProfileMenu(false)}
                >
                  {loggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Profile
                      </Link>
                      <Link
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Login
                      </Link>
                    </>
                  )}
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
                <Link to="/" onClick={handleMenuToggle}>Home</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/contact" onClick={handleMenuToggle}>Contact</Link>
              </li>
              <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                <Link to="/about" onClick={handleMenuToggle}>About</Link>
              </li>
              {loggedIn ? (
                <>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/profile" onClick={handleMenuToggle}>Profile</Link>
                  </li>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/wishlist" onClick={handleMenuToggle}>Wishlist</Link>
                  </li>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/cart" onClick={handleMenuToggle}>Cart</Link>
                  </li>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/orders" onClick={handleMenuToggle}>Orders</Link>
                  </li>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link onClick={() => { handleLogout(); handleMenuToggle(); }}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/signup" onClick={handleMenuToggle}>Sign Up</Link>
                  </li>
                  <li className="w-full text-center p-2 hover:bg-gray-200 rounded-md transition-all">
                    <Link to="/login" onClick={handleMenuToggle}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
