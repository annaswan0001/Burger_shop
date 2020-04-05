import * as actionTypes from "../actions/actionType";

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
        }
     
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.igredientName]: state.ingredients[action.igredientName] - 1,
        }
      };
    default:
      return state;
  }
};
