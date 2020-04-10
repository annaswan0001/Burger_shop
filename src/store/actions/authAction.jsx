import * as actionTypes from "./actionType";
import axios from "axios";
import {fetchOrders} from './orderAction'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SAGA,
  };
};
export const authLogoutRedux = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT_SAGA,
    expirationTime
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_START_SAGA,
    email,
    password,
    isSignUp
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => {
  return({
    type: actionTypes.AUTH_CHECK_STATE_SAGA
  })
}


export const authCheckStateOrder = ()=>(dispatch,getState)=>{
  dispatch(authCheckState())
  dispatch(fetchOrders(getState().auth.token,getState().auth.userId ))
}



