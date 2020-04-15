import * as actionsType from "./actionType";
import axios from "../../axios-orders";


type ingredientNameType =  "bacon" | "meat" | "cheese"|"salad" 

export type addIngredientType = {
  type: typeof actionsType.ADD_INGREDIENTS,
  igredientName: ingredientNameType
}

export const addIngredient = (igredientName:ingredientNameType):addIngredientType => ({
  type: actionsType.ADD_INGREDIENTS,
  igredientName,
});



export type removeIngredientType = {
  type: typeof actionsType.REMOVE_INGREDIENTS,
  igredientName:ingredientNameType
};

export const removeIngredient = (igredientName:ingredientNameType):removeIngredientType => ({
    type: actionsType.REMOVE_INGREDIENTS,
    igredientName,
  });
  

  export type ingredientsType =  {
    salad: number | null,
    bacon: number | null,
    cheese: number | null,
    meat: number | null,
  }

  export type setIngredientsType = {
    type: typeof actionsType.SET_INGREDIENTS,
    ingredients: ingredientsType
  }

  export const setIngredients = (ingredients:ingredientsType):setIngredientsType => ({
    type: actionsType.SET_INGREDIENTS,
    ingredients
  })
  




  export type fetchIngredientFailedType ={
    type: typeof actionsType.FETCH_INGREDIENT_FAILED,

  }

  export const fetchIngredientFailed = () : fetchIngredientFailedType=> ({
    type: actionsType.FETCH_INGREDIENT_FAILED,
  })
  


  export type fetchIngredientType = {
    type: typeof actionsType.FETCH_INGREDIENT,
  }
  export const fetchIngredient = ():fetchIngredientType  => ({
    type: actionsType.FETCH_INGREDIENT,
  })
  



export type initIngredientsType = {
    type:typeof actionsType.INIT_INGREDIENTS_SAGA
  }
export const initIngredients = ():initIngredientsType=>{
  return({
    type:actionsType.INIT_INGREDIENTS_SAGA
  })

}




export type reseteIngredientsType ={
  type: typeof actionsType.RESET_INGREDIENTS,
}
export const reseteIngredients = ():reseteIngredientsType => ({
  type: actionsType.RESET_INGREDIENTS,
})


export type burgerBuilderActionType = reseteIngredientsType| initIngredientsType| fetchIngredientType |fetchIngredientFailedType|setIngredientsType |removeIngredientType |addIngredientType 
