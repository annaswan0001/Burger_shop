import React, { useState, useEffect } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

     //Если мы хотим, чтобы ф-ция запускалась до рендеринга(СomponentWillMount -просто добавляем ее в  тело функции без эффектов)
    const requestInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const responceInterceptor = axios.interceptors.response.use((res) => res,(err) => {
        setError(err);
      }
    );

    const errorConfirmedHandler = () => {
      setError(null);
    };

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responceInterceptor);
      };
    }, [requestInterceptor,responceInterceptor]);//очищаем эффекты чтобы не вызвать утечку памяти

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
