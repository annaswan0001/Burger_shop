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
  
  export const setIngredients = (ingredients) => ({
    type: actionsType.SET_INGREDIENTS,
    ingredients
  })
  
  export const fetchIngredientFailed = () => ({
    type: actionsType.FETCH_INGREDIENT_FAILED,
  })
  
  export const fetchIngredient = () => ({
    type: actionsType.FETCH_INGREDIENT,
  })
export const initIngredients = ()=> (dispatch)=>{
  
  dispatch(fetchIngredient())
  

    axios
    .get("https://burgershop-588e7.firebaseio.com/ingredients.json")
    .then(res => {
      dispatch(setIngredients(res.data ))
    })
    .catch(err => {
      dispatch(fetchIngredientFailed())
    });
 

}

export const reseteIngredients = () => ({
  type: actionsType.RESET_INGREDIENTS,
})


