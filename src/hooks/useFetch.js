import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (fn, setContextState) => {
    try {
      setIsLoading(true);
      const results = await fn;
      setContextState(results);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchData, isLoading,
  };
};

export default useFetch;
