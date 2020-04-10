import * as actionsTypes from "./actionType";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionsTypes.PURCHASE_BURGER_SUCCESS,
  id,
  orderData,
});

export const purchaseBurgerFailed = (error) => ({
  type: actionsTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerRequest = () => ({
  type: actionsTypes.PURCHASE_BURGER_REQUEST,
});

export const purchaseBurgerStart = (orderData, token) => {
  return {
    type: actionsTypes.PURCHASE_BURGER_SAGA,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return ({
    type: actionsTypes.FETCH_ORDERS_SAGA,
    token,
    userId,
  });
};
