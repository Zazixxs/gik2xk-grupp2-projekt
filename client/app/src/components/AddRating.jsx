import React, { useState } from 'react';
import MuiRating from '@material-ui/lab/Rating';
import axios from 'axios';

function PostRating({ productId }) {
  const [value, setValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (event, newValue) => {
    if (submitted) {
      return;
    }

    setValue(newValue);
    setSubmitted(true);
    axios.post(`/api/ratings/${productId}`, {
      productId: productId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ratings: newValue
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Failed to post rating:', error);
    });
  };
  
  return (
    <div className='ratingform'>
    <h3>Rate this product</h3>
      <MuiRating
        name="post-rating"
        value={value}
        onChange={handleRatingChange}
      />
      {submitted && <p>Tack för din bedömning!</p>}
    </div>
  );
}

export default PostRating;
