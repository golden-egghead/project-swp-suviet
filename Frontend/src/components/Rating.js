import React from 'react';

const Rating = ({ selectedRating, onVote }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((rating) => (
        <span
          key={rating}
          style={{ cursor: 'pointer', color: rating <= selectedRating ? 'gold' : 'gray' }}
          onClick={() => onVote(rating)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
