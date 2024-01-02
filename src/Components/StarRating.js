import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const onStarClick = (nextValue) => {
    setRating(nextValue);
    if (onRatingChange) {
      onRatingChange(nextValue);
    }
  };

  return (
    <div className="star-rating">
      <StarRatingComponent 
        name="rate1" 
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
        renderStarIcon={(index, value) => (
          <span className="star">{index <= value ? '★' : '☆'}</span>
        )}
        renderStarIconHalf={() => <span className="star">½</span>}
      />
    </div>
  );
};

export default StarRating;
