import { takeEvery,takeLatest, throttle, take, cancel,fork } from "redux-saga/effects";
import {
  logoutSaga,
  checkTimeoutLogoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./auth"; 
import { initIngredientsSaga } from "./burgerBuilder";
import * as actionTypes from "../actions/actionType";
import { purchaseBurgerStart, fetchOrdersSaga } from "./orders";
import {fetchInputValueDebounced, fetchInputValueDebounced2} from './inputDebaunced'

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_LOGOUT_SAGA, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT_SAGA, checkTimeoutLogoutSaga);
  yield takeEvery(actionTypes.AUTH_START_SAGA, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE_SAGA, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS_SAGA, initIngredientsSaga);
}

export function* watchMakeOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerStart);
  yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga);
}

export function* watchSetInputValueDebounced() {
  // yield debounce(5000, actionTypes.INPUT_SET_VALUEDEBAUNCED_SAGA, fetchInputValueDebounced)// после окончания введения через 5 сек отправляется запрос с послед данными
  yield throttle(3000, actionTypes.INPUT_SET_VALUEDEBAUNCED_SAGA, fetchInputValueDebounced) //Каждые 2 сек отправл запрос
}

export function* watchSetInputValueDebounced2() {

  yield takeLatest(actionTypes.INPUT_SET_VALUEDEBAUNCED_SAGA2, fetchInputValueDebounced2);
}