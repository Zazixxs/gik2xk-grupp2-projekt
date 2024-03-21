import axios from './api';

export const getAll = async (endpoint = '/products') => {
  try {
    const response = await axios.get(endpoint);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}: `, error);
    return [];
  }
};



export const getProduct = async (id) => {
  try {
    const response = await axios.get(`/api/product/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with id ${id}: `, error);
    return null;
  }
};


export const getAllRatings = async (id)  => {
  try {
    const response = await axios.get(`/api/ratings/${id}`);
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch ratings:', error);
    return [];
  } 
}
