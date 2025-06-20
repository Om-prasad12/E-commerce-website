import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Stars = ({ ratings }) => {
  const ratingStars = Array.from({ length: 5 }).map((_, index) => {
    let halfStarValue = index + 0.5; // Half-star comparison

    return (
      <span key={index}>
        {ratings >= index + 1 ? (
          <FaStar className="" style={{ color: "orange",fontSize:"1.5rem" }} />
        ) : ratings >= halfStarValue ? (
          <FaStarHalfAlt className="" style={{ color: "orange",fontSize:"1.5rem" }} />
        ) : (
          <AiOutlineStar className="" style={{ color: "orange",fontSize:"1.5rem" }} />
        )}
      </span>
    );
  });

  return (
    <div className="flex space-x-1">
      {ratingStars}
    </div>
  );
};

export default Stars;
