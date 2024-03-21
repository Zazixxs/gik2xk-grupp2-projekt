import React, { useState, useEffect } from 'react';
import MuiRating from '@material-ui/lab/Rating';
import { getAllRatings } from '../service/getService';

function Rating({ id }) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    getAllRatings(id)
    .then(data => {
      setValue(data.averageRating);
    })
    .catch(error => console.error('Failed to fetch rating:', error));
  }, [id]);

  return (
    <div>
      <MuiRating
        name="read-only-rating"
        value={value}
        readOnly
      />
    </div>
  );
}

export default Rating;
