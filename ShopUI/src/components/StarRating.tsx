import React, { useState } from "react";

interface StarRatingProps {
  initialRating: number;
  clickable?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({
  initialRating,
  clickable = false,
  onRatingChange,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index: number) => {
    if (clickable) {
      setRating(index);
      if (onRatingChange) {
        onRatingChange(index);
      }
    }
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className="material-icons"
        style={{
          cursor: clickable ? "pointer" : "default",
          color: i <= rating ? "#ffab00" : "#d3d3d3",
        }}
        onClick={() => handleClick(i)}
      >
        {i <= rating ? "star" : "star_border"}
      </i>
    );
  }

  return (
    <div className="row" style={{ margin: "0" }}>
      {stars}
    </div>
  );
};

export default StarRating;
