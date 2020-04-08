import * as actionTypes from "./actionType";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvzZlbgQc1kfjiZXRuteDc8-reRPb2fN4";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvzZlbgQc1kfjiZXRuteDc8-reRPb2fN4";
    }
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken,response.data.localId));
    
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
