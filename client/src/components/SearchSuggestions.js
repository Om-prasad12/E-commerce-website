import React from 'react';
import { IoMdSearch } from 'react-icons/io';

const SearchSuggestions = ({ suggestions, onSuggestionClick, onSearchClick, searchQuery, isLoading, isMobile = false }) => {
  if (isLoading) {
    return (
      <div className={`bg-white border border-gray-300 shadow-lg ${
        isMobile 
          ? 'rounded-md mt-1 z-[70]' 
          : 'absolute top-full left-0 right-0 rounded-b-md z-50'
      }`}>
        <div className="p-3 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
            Loading suggestions...
          </div>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className={`bg-white border border-gray-300 shadow-lg ${
        isMobile 
          ? 'rounded-md mt-1 z-[70]' 
          : 'absolute top-full left-0 right-0 rounded-b-md z-50'
      }`}>
        <div className="p-3 text-center text-gray-500 text-sm">
          No suggestions found
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-300 shadow-lg ${
      isMobile 
        ? 'rounded-md mt-1 max-h-80 overflow-y-auto z-[70]' 
        : 'absolute top-full left-0 right-0 rounded-b-md max-h-60 overflow-y-auto z-50'
    }`}>
      
      {/* Search for all results option */}
      <div
        className={`flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200 bg-gray-50 transition-colors ${
          isMobile ? 'p-4' : 'p-3'
        }`}
        onClick={() => onSearchClick(searchQuery)}
      >
        <IoMdSearch className={`text-gray-500 mr-3 ${isMobile ? 'text-lg' : ''}`} />
        <span className={`text-gray-700 ${isMobile ? 'text-base font-medium' : 'text-sm'}`}>
          Search for "{searchQuery}"
        </span>
      </div>

      {/* Individual product suggestions */}
      {suggestions.map((product, index) => {
        const productData = product.item || product;
        const imageUrl = productData.images?.[0] || productData.image || '/placeholder-image.jpg';
        
        return (
          <div
            key={productData._id || productData.id || index}
            className={`flex items-center hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
              isMobile ? 'p-4' : 'p-3'
            }`}
            onClick={() => onSuggestionClick(productData)}
          >
            <img
              src={imageUrl}
              alt={productData.title || 'Product'}
              className={`object-cover rounded mr-3 flex-shrink-0 ${
                isMobile ? 'w-12 h-12' : 'w-10 h-10'
              }`}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="flex-grow min-w-0">
              <p className={`font-medium text-gray-900 truncate ${
                isMobile ? 'text-base mb-1' : 'text-sm'
              }`}>
                {productData.title || 'No title'}
              </p>
              {isMobile ? (
                // Mobile layout: Price on right, category and brand below
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {productData.category || 'No category'}
                    </p>
                    <p className="text-base text-gray-900 font-semibold">
                      ₹{productData.price || 0}
                    </p>
                  </div>
                  {productData.brand && (
                    <p className="text-xs text-gray-400 mt-1">
                      {productData.brand}
                    </p>
                  )}
                </>
              ) : (
                // Desktop layout: Original compact design
                <p className="text-xs text-gray-500">
                  {productData.category || 'No category'} • ₹{productData.price || 0}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;