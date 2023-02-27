import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async (fn, setContextState) => {
    try {
      setIsLoading(true);
      const results = await fn;
      setContextState(results);
    } catch (e) {
      setErrors(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData, isLoading, errors,
  };
};

export default useFetch;
