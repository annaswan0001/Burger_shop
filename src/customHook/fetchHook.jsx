import { useState, useEffect } from "react";
import axios from "axios";

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {     
      setIsError(false);
      setIsLoading(true);

      try {
       
        const result = await axios(url);
       
        if (!didCancel) {
       
          setData(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }

      setIsLoading(false);
    };

    fetchData();
    return () => {
     
      didCancel = true;
    };
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;
