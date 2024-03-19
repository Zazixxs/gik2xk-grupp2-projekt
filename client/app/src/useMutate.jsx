import { useState } from 'react';
import axios from 'axios'; // antar att du använder axios för HTTP-begäranden

function useMutate({ method, url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mutate = async (data) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios({
        method,
        url,
        data,
      });

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      throw error;
    }
  };

  return { mutate, isLoading, isError };
}

export default useMutate;
