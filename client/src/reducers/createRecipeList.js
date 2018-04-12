import { combineReducers } from 'redux';

const createRecipeList = filter => {
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { favorite } = entities.recipes[toggleId];
    const shouldRemove = !favorite && filter === 'favorite';
    return shouldRemove ? state.filter(id => id !== toggleId) : state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RECIPES_SUCCESS':
        return action.recipes.data.data
      case 'TOGGLE_RECIPE_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetchingRecipes = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_RECIPES_REQUEST':
        return true;
      case 'FETCH_RECIPES_SUCCESS':
      case 'FETCH_RECIPES_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_RECIPES_FAILURE':
        return action.message;
      case 'FETCH_RECIPES_REQUEST':
      case 'FETCH_RECIPES_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetchingRecipes,
    errorMessage,
  });
};

export default createRecipeList;

export const getIds = (state) => state.ids;
export const getIsRecipeFetching = (state) => state.isFetchingRecipes;
export const getRecipeErrorMessage = (state) => state.errorMessage;
