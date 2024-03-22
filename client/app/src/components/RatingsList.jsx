import React, { useState, useEffect } from 'react';
import MuiRating from '@material-ui/lab/Rating';
import { getAllRatings } from '../service/getService';

function RatingsList({ id }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getAllRatings(id)
    .then(data => {
      setRatings(data.allRatings);
    })
    .catch(error => console.error('Failed to fetch ratings:', error));
  }, [id]);

  return (
    <div className='ratingslist'>
        <h3>Tidigare betyg</h3>
      {ratings.map((rating, index) => (
        <div key={index}>
          <MuiRating
            name={`read-only-rating-${index}`}
            value={rating.ratings}
            readOnly
          />
        </div>
      ))}
    </div>
  );
}

export default RatingsList;
