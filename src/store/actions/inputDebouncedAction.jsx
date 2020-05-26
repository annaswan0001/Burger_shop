import * as actionTypes from "./actionType";


export const inputSetValueSaga = (value) => {
    return {
      type: actionTypes.INPUT_SET_VALUEDEBAUNCED_SAGA,
      value: value,
    };
  };


  export const inputSetValueSaga2 = (value) => {
    return {
      type: actionTypes.INPUT_SET_VALUEDEBAUNCED_SAGA2,
      value: value,
    };
  };