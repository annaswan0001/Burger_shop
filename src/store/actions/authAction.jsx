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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); //перевели в мл секунды, приплюсовали, перевели обратно в млсекунды
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("token is here")
    const expirationDate = new Date(localStorage.getItem("expirationDate")); //local storage is a string but new Date convert it to object
    const userId = localStorage.getItem("userId");
 
    if (expirationDate> new Date()){
      dispatch(authSuccess(token, userId))
      dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000))
      console.log("время",(expirationDate.getTime()- new Date().getTime())/1000)
    }
    else{
      dispatch.authLogout()
    }
  }
  else{
    console.log("no token")
  }
};

export const authCheckStateOrder = ()=>(dispatch,getState)=>{
  dispatch(authCheckState())
  dispatch(fetchOrders(getState().auth.token,getState().auth.userId ))
}
// export const authCheckState = () => (dispatch) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     console.log("token is here")
//     const expirationDate = new Date(localStorage.getItem("expirationDate")); //local storage is a string but new Date convert it to object
//     const userId = localStorage.getItem("userId");
 
//     if (expirationDate> new Date()){
//       dispatch(authSuccess(token, userId))
//       dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000))
//       dispatch(fetchOrders(token))
//       console.log("время",(expirationDate.getTime()- new Date().getTime())/1000)
//     }
//     else{
//       dispatch.authLogout()
//     }
//   }
//   else{
//     console.log("no token")
//   }
// };


