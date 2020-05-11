import { useEffect, useState } from "react";

export const useHttpErrorHandler = (httpClient) => {
  const [error, setError] = useState(null);

  const requestInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const responceInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      // console.log(err.message)
      if (!err.response) {
        setError(err);
      } else {
        if (400 === err.response.status) {
          throw err;
        } else {
          setError(err);
        }
      }
    }
  );
  const errorConfirmedHandler = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responceInterceptor);
    };
  }, [requestInterceptor, responceInterceptor]);

  return [error, errorConfirmedHandler];
};
