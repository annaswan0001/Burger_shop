import * as actionsTypes from "./actionType";
import axios from "../../axios-orders";
import { string } from "prop-types";
import { ActionCreatorsMapObject } from "redux";

type purchaseBurgerSuccessType={
  type : typeof actionsTypes.PURCHASE_BURGER_SUCCESS,
  id : string,
  orderData:string
}
export const purchaseBurgerSuccess = (id:string, orderData:string): purchaseBurgerSuccessType=> ({
  type: actionsTypes.PURCHASE_BURGER_SUCCESS,
  id,
  orderData,
});

type purchaseBurgerFailedType = {
  type: typeof actionsTypes.PURCHASE_BURGER_FAIL,
  error: boolean
}
export const purchaseBurgerFailed = (error:boolean):purchaseBurgerFailedType => ({
  type: actionsTypes.PURCHASE_BURGER_FAIL,
  error,
});

type purchaseBurgerRequest = {
  type: typeof actionsTypes.PURCHASE_BURGER_REQUEST
}

export const purchaseBurgerRequest = ():purchaseBurgerRequest => ({
  type: actionsTypes.PURCHASE_BURGER_REQUEST,
});

export type purchaseBurgerStartType = {
  type : typeof actionsTypes.PURCHASE_BURGER_SAGA,
  orderData:string,
  token:string
}
export const purchaseBurgerStart = (orderData:string, token:string):purchaseBurgerStartType => {
  return {
    type: actionsTypes.PURCHASE_BURGER_SAGA,
    orderData,
    token,
  };
};
export  type purchaseInit = {
  type: typeof  actionsTypes.PURCHASE_INIT
}
export const purchaseInit = ():purchaseInit  => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  };
};


export type fetchOrdersSuccessType = {
  type: typeof actionsTypes.FETCH_ORDERS_SUCCESS,
  orders: any[]
}

export const fetchOrdersSuccess = (orders:any[]):fetchOrdersSuccessType => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};


export type fetchOrdersFailType = {
  type: typeof actionsTypes.FETCH_ORDERS_FAIL,
  error:boolean
}

export const fetchOrdersFail = (error:boolean):fetchOrdersFailType  => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export type fetchOrdersStartType= {
  type: typeof actionsTypes.FETCH_ORDERS_START
}
export const fetchOrdersStart = ():fetchOrdersStartType => {
  return {
    type: actionsTypes.FETCH_ORDERS_START,
  };
};


export type fetchOrdersTypes = {
  type: typeof actionsTypes.FETCH_ORDERS_SAGA,
  token:string,
  id:string
}
export const fetchOrders = (token:string, userId:string) => {
  return {
    type: actionsTypes.FETCH_ORDERS_SAGA,
    token,
    userId,
  };
};
