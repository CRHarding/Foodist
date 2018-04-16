import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function voteReducer(state = initialState.votes, action) {
  switch (action.type) {
    case types.LOAD_VOTES_SUCCESS:
      return action.recipes.data.data;
    case types.UPDATE_VOTE_SUCCESS:
      return [
        ...state.filter(vote => vote.id !== action.recipe.data.vote.id),
        Object.assign({}, action.recipe.data.vote),
      ];
    case types.CREATE_VOTE_SUCCESS:
      return [
        ...state.filter(vote => vote.id !== action.recipe.data.vote.id),
        Object.assign({}, action.recipe.data.vote),
      ];
    default:
      return state;
  }
}
