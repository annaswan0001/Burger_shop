 import {put} from 'redux-saga/effects'
 import * as actionTypes from '../store/actions/actionType'
 import {authLogoutRedux} from '../store/actions/authAction'
 
 export function* logoutSaga (){
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(authLogoutRedux())
 }