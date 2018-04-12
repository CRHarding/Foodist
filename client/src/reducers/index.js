import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  favorite: createList('favorite'),
});

const recipes = combineReducers({
  byId,
  listByFilter,
});

export default recipes;

export const getVisibleRecipes = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  console.log(ids);
  const newIds = ids.map(id => fromById.getRecipe(state.byId, id));
  console.log(newIds);
  return newIds;
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
