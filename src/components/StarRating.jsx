import { useState } from "react";

const StarRating = ({ rating, editable = true, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (newRating) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };
  
  const handleMouseEnter = (newHoverRating) => {
    if (editable) {
      setHoverRating(newHoverRating);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hoverRating ? star <= hoverRating : star <= rating;
        return (
          <span
            key={star}
            className={`star ${filled ? "filled" : ""} ${editable ? "editable" : ""}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            {filled ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;