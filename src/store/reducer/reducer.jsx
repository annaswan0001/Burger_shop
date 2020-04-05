import * as actionTypes from "../actions/actionType";


const PRICES = {
    meat: 2.3,
    bacon: 2.2,
    cheese: 1,
    salad: 1
  };

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 5,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients : {
            ...state.ingredients,
            [action.igredientName]: state.ingredients[action.igredientName] + 1,
        },
        totalPrice:state.totalPrice + PRICES[action.igredientName]
     
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.igredientName]: state.ingredients[action.igredientName] - 1,
        },
        totalPrice:state.totalPrice - PRICES[action.igredientName]
      };
    default:
      return state;
  }
};
