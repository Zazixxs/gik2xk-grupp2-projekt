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

export const addToCart = async (userId, productId, amount = 1) => {
  try {
      await axios.post(`/api/${userId}/addProduct`, { productId, amount });
      return getCart(userId);
  } catch (error) {
      console.error('Ett fel uppstod när produkten skulle läggas till i varukorgen', error);
  }
};



export const removeFromCart = async (userId, productId) => {
  try {
    // Step 1: Fetch the current cart for the user
    const cart = await getCart(userId);
    console.log(cart);
    console.log(userId, productId);
    await axios.delete(`/api/cart/${userId}/${productId}`);
    return getCart(userId);
  } catch (error) {
    console.error('An error occurred while removing the product from the cart:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};




