import { put } from "redux-saga/effects";
import axios from '../../axios-orders'
import {
  purchaseBurgerRequest,
  purchaseBurgerSuccess,
  purchaseBurgerFailed,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail
} from "../actions/orderAction";

export function* purchaseBurgerStart(action) {
  yield put(purchaseBurgerRequest());

  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (err) {
    yield put(purchaseBurgerFailed(err));
  }
}


export function* fetchOrdersSaga (action){
        yield put (fetchOrdersStart());
        try{const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const res = yield axios.get( '/orders.json'+ queryParams)
        const fetchedOrders = [];
         for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
       yield put (fetchOrdersSuccess(fetchedOrders))
            }catch(err){
                yield put (fetchOrdersFail(err));
            };
    };
