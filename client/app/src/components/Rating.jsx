import React from 'react';

function Rating({ rating }) {
  const stars = [1, 2, 3, 4, 5].map((star) => {
    if (rating >= star) {
      return <span key={star}>⭐</span>; 
    } else if (rating >= star - 0.5) {
      return <span key={star}>⭐</span>; 
    } else {
      return <span key={star}>☆</span>;
    }
  });
  return <div>{stars}</div>;
}

export default Rating;
