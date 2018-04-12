import { combineReducers } from 'redux';

const createList = filter => {
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { favorite } = entities.recipes[toggleId];
    const shouldRemove = !favorite && filter === 'favorite';
    return shouldRemove ? state.filter(id => is !== toggleId) : state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RECIPES_SUCCESS':
        return filter === action.filter ? action.response.result : state;
      case 'TOGGLE_RECIPE_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
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
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
