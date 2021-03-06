import { put, delay,call } from "redux-saga/effects";
import * as actionTypes from "../actions/actionType";
import {
  authLogoutRedux,
  authLogout,
  authSuccess,
  checkAuthTimeout,
  authStart,
  authFail
} from "../actions/authAction";
import axios from "../../axios-login";
export function* logoutSaga(action) {
  yield call ([localStorage,"removeItem"],"token");
  yield call ([localStorage, "removeItem"],"expirationDate");
  yield call ([localStorage, "removeItem"],"userId");
  yield put(authLogoutRedux());
}

export function* checkTimeoutLogoutSaga(action) {
  //!!!!!! передаем action
  yield delay(action.expirationTime * 1000);
  yield put(authLogout());
}

export function* authSaga(action) {
  yield put(authStart());
  const data = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    ":signUp?key=AIzaSyDvzZlbgQc1kfjiZXRuteDc8-reRPb2fN4";
  if (!action.isSignUp) {
    url =
      ":signInWithPassword?key=AIzaSyDvzZlbgQc1kfjiZXRuteDc8-reRPb2fN4";
  }
  try {
    const response = yield axios.post(url, data);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    ); //перевели в мл секунды, приплюсовали, перевели обратно в млсекунды
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    if(err.response)
    yield put(authFail(err.response.data.error));
  }
}



export function* authCheckStateSaga (){
    const token = yield localStorage.getItem("token");
    if (token) {
      console.log("token is here")
      const expirationDate = yield new Date(localStorage.getItem("expirationDate")); //local storage is a string but new Date convert it to object
      const userId = yield localStorage.getItem("userId");
   
      if (expirationDate> new Date()){
        yield put(authSuccess(token, userId))
        yield put(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000))
        // console.log("время",(expirationDate.getTime()- new Date().getTime())/1000)
      }
      else{
        // yield put(authLogout())
      }
    }
    else{
        // yield put(authLogout())
    }
}

