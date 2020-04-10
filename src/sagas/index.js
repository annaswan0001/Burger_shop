import {takeEvery} from 'redux-saga/effects'
import {logoutSaga} from './auth'
import * as actionTypes from '../store/actions/actionType'

export function* watchAuth (){
yield takeEvery(actionTypes.AUTH_SAGA_LOGOUT, logoutSaga)
}