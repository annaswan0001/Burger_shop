import * as actionsType from "./actionType";

export const addIngredient = (igredientName) => ({
  type: actionsType.ADD_INGREDIENTS,
  igredientName,
});

export const removeIngredient = (igredientName) => ({
    type: actionsType.REMOVE_INGREDIENTS,
    igredientName,
  });
  