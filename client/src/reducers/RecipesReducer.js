import * as types from '../actions/actionTypes';
import initialState from './initialState';
import history from '../components/history';

export default function recipeReducer(state = initialState.recipes, action) {
  switch (action.type) {
    case types.LOAD_RECIPES_SUCCESS:
      return action.recipes.data.data;
    case types.UPDATE_RECIPE_SUCCESS:
      history.push(`/recipes/${action.recipe.data.recipe.id}`);
      return [
        ...state.filter(recipe => recipe.id !== action.recipe.id),
        Object.assign({}, action.recipe),
      ];
    case types.CREATE_RECIPE_SUCCESS:
      history.push(`/recipes/${action.recipe.data.recipe.id}`);
      return [
        ...state.filter(recipe => recipe.id !== action.recipe.id),
        Object.assign({}, action.recipe),
      ];
    case types.DELETE_RECIPE_SUCCESS: {
      history.push('/');
      const newState = Object.assign([], state);
      const indexOfRecipeToDelete = state.findIndex(recipe => {
        return recipe.id === action.recipe.id;
      });
      newState.splice(indexOfRecipeToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
