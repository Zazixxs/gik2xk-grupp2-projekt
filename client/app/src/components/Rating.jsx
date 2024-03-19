import React from 'react';
import MuiRating from '@material-ui/lab/Rating';

function Rating({id}) {
  const [value, setValue] = React.useState(2);

  const handleChange = async (event, newValue) => {
    setValue(newValue);

    const response = await fetch(`http://localhost:5000/api/rating/post/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratings: newValue }),
    });

    if (!response.ok) {
      console.error('Failed to post rating');
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
