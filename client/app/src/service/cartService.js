import axios from './api';

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`/api/cart/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error getting cart for user with id ${userId}: `, error);
    return null;
  }
};


export const addProductToCart = async (userId, productId, amount) => {
  console.log(`userId: ${userId}, productId: ${productId}, amount: ${amount}`); // Logga inputs

  try {
    const response = await axios.post('/api/cart/addProduct', {
      userId,
      productId,
      amount
    });

    if (response.status !== 201) {
      throw new Error('Något gick fel');
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



