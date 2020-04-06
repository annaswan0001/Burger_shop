import * as actionTypes from "../actions/actionType";


const PRICES = {
    meat: 2.3,
    bacon: 2.2,
    cheese: 1,
    salad: 1
  };

const initialState = {
  ingredients: {},
  totalPrice: 5,
  spinner: false,
  error: false
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
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients:{
              salad:action.ingredients.salad, //для сохранения последовательности выводы элементов бургера = харкодим, а не забрасиваем обьект
              bacon:action.ingredients.bacon,
              cheese:action.ingredients.cheese,
              meat:action.ingredients.meat
          },
          totalPrice:5,
          error:true
        };
        case actionTypes.FETCH_INGREDIENT_FAILED:
          return {
            ...state,
            error:true
          };
    default:
      return state;
  }
};
