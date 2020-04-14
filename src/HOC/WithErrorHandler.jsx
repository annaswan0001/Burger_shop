import React, { useState, useEffect } from "react";
import Modal from "../components/UI/Modal/Modal";

import {useHttpErrorHandler} from '../customHook/showErroHook'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
//очищаем эффекты чтобы не вызвать утечку памяти
const [error,errorConfirmedHandler]= useHttpErrorHandler(axios)
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
