import {takeEvery} from 'redux-saga/effects'
import {logoutSaga, checkTimeoutLogoutSaga,authSaga,authCheckStateSaga} from './auth'
import * as actionTypes from '../store/actions/actionType'

export function* watchAuth (){
yield takeEvery(actionTypes.AUTH_LOGOUT_SAGA, logoutSaga)
yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT_SAGA, checkTimeoutLogoutSaga )
yield takeEvery(actionTypes.AUTH_START_SAGA,authSaga )
yield takeEvery(actionTypes.AUTH_CHECK_STATE_SAGA, authCheckStateSaga )
}