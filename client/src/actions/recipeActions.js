import RecipeService from '../services/RecipeServices';
import * as types from './actionTypes';

export function loadRecipes() {
  return function(dispatch) {
    return RecipeService.getAllRecipes()
      .then(recipes => {
        dispatch(loadRecipesSuccess(recipes));
      })
      .catch(err => {
        console.log('Error in load recipes--->', err);
      });
  };
}

export function updateRecipe(recipe, num) {
  return function(dispatch) {
    return RecipeService.updateRecipe(recipe, num)
      .then(responseRecipe => {
        dispatch(updateRecipeSuccess(responseRecipe));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function createRecipe(recipe) {
  return function(dispatch) {
    return RecipeService.createRecipe(recipe)
      .then(responseRecipe => {
        dispatch(createRecipeSuccess(responseRecipe));
        return responseRecipe;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function deleteRecipe(recipe) {
  return function(dispatch) {
    return RecipeService.deleteRecipe(recipe)
      .then(() => {
        console.log(`Deleted ${recipe.id}`);
        return;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function deleteRecipeSuccess(recipe) {
  return { type: types.DELETE_RECIPE_SUCCESS, recipe };
}

export function loadRecipesSuccess(recipes) {
  return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function updateRecipeSuccess(recipe) {
  return { type: types.UPDATE_RECIPE_SUCCESS, recipe };
}

export function createRecipeSuccess(recipe) {
  return { type: types.CREATE_RECIPE_SUCCESS, recipe };
}
