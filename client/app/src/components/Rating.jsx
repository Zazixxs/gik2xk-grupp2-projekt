import React, { useState, useEffect } from 'react';
import MuiRating from '@material-ui/lab/Rating';
import { getAllRatings } from '../service/getService';

function Rating(id) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    getAllRatings(id)
    .then(data => {
      setValue(data.averageRating);
    })
    .catch(error => console.error('Failed to fetch rating:', error));
  }, [id]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);

    try {
      const response = await axios.post('http://localhost:5000/api/ratings', {
        productId: id, ratings: newValue
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Posted rating:', data);
    } catch (error) {
      console.error('Failed to post rating:', error);
    }
  };

  return (
    <div>
      <MuiRating
        name="simple-controlled"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Rating;
