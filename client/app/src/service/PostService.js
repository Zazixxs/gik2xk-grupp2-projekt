import axios from './api';

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/delete/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error deleting product with id ${id}: `, error);
    return null;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`/api/update/${id}`, productData);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error updating product with id ${id}: `, error);
    return null;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`/api/post`, productData);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error creating product: `, error);
    return null;
  }
};

export const postRating = async (id, rating) => {
  try {
    const response = await axios.post(`/api/rating/post/${id}`, { ratings: rating });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error posting rating for product with id ${id}: `, error);
    return null;
  }
};
