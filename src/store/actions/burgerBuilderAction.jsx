import * as actionsType from "./actionType";
import axios from "../../axios-orders";


export const addIngredient = (igredientName) => ({
  type: actionsType.ADD_INGREDIENTS,
  igredientName,
});

export const removeIngredient = (igredientName) => ({
    type: actionsType.REMOVE_INGREDIENTS,
    igredientName,
  });
  

export const initIngredients = ()=> (dispatch)=>{
  axios
  .get("https://burgershop-588e7.firebaseio.com/ingredients.json")
  .then(res => {
    dispatch(setIngredients(res.data ))
  })
  .catch(err => {
    dispatch(fatchIngredientFailed())
  });
}

export const setIngredients = (ingredients) => ({
  type: actionsType.SET_INGREDIENTS,
  ingredients
})

export const fatchIngredientFailed = () => ({
  type: actionsType.FETCH_INGREDIENT_FAILED,
})

