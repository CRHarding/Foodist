import { combineReducers } from 'redux';
import byRecipeId, * as fromByRecipeId from './byRecipeId';
import byCommentId, * as fromByCommentId from './byCommentId';
import createRecipeList, * as fromRecipeList from './createRecipeList';
import createCommentList, * as fromCommentList from './createCommentList';

const listByRecipeFilter = combineReducers({
  all: createRecipeList('all'),
  favorite: createRecipeList('favorite'),
});

const listByCommentFilter = combineReducers({
  all: createCommentList('all'),
  favorite: createCommentList('favorite'),
});

const recipes = combineReducers({
  byRecipeId,
  byCommentId,
  listByRecipeFilter,
  listByCommentFilter,
});

export default recipes;

export const getVisibleRecipes = (state, filter) => {
  const ids = fromRecipeList.getIds(state.listByRecipeFilter[filter]);
  return ids;
};

export const getVisibleComments = (state, filter) => {
  const ids = fromCommentList.getIds(state.listByCommentFilter[filter]);
  return ids;
}

export const getIsRecipeFetching = (state, filter) =>
  fromRecipeList.getIsRecipeFetching(state.listByRecipeFilter[filter]);

export const getIsCommentFetching = (state, filter) =>
  fromCommentList.getIsCommentFetching(state.listByCommentFilter[filter]);

export const getRecipeErrorMessage = (state, filter) =>
  fromRecipeList.getRecipeErrorMessage(state.listByRecipeFilter[filter]);

export const getCommentErrorMessage = (state, filter) =>
  fromCommentList.getCommentErrorMessage(state.listByCommentFilter[filter]);
