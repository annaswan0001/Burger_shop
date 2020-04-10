import { takeEvery,takeLatest } from "redux-saga/effects";
import {
  logoutSaga,
  checkTimeoutLogoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import * as actionTypes from "../actions/actionType";
import { purchaseBurgerStart, fetchOrdersSaga } from "./orders";

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
