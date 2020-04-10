 import {put} from 'redux-saga/effects'
 import * as actionTypes from '../store/actions/actionType'
 
 function* logout(action){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    put({
        type: actionTypes.AUTH_LOGOUT
    })
 }