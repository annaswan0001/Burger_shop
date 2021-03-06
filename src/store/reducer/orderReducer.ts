import * as actionTypes from "../actions/actionType";


// type initialStateType= {
//   order: any[],
//   loading: boolean ,
//   error: boolean,
//   purchased: boolean ,
// }

const initialState= {
  order: [] as any[],
  loading: false,
  error: false ,
  purchased: false,
};
export type initialStateType = typeof initialState

export default (state = initialState, action:any): initialStateType => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_REQUEST:
      return { ...state, loading: true, error: false };
    case actionTypes.PURCHASE_INIT:
      return { ...state, purchased: false };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.id,
        
      };
      return {
        ...state,
        error: false,
        loading: false,
        order: [...state.order, newOrder],
        purchased: true,
    
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state, loading: false, error: action.error };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, order:action.orders };
    case actionTypes.FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.error };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true, error: false};
    default:
      return state;
  }
};
