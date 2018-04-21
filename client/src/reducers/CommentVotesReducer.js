import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentVoteReducer(state = initialState.commentVotes, action) {
  switch (action.type) {
    case types.LOAD_COMMENT_VOTES_SUCCESS:
      return action.comments.data.data;
    case types.UPDATE_COMMENT_VOTE_SUCCESS:
      return [
        ...state.filter(vote => vote.id !== action.comment.data.vote.id),
        Object.assign({}, action.comment.data.vote),
      ];
    case types.CREATE_COMMENT_VOTE_SUCCESS:
      return [
        ...state.filter(vote => vote.id !== action.comment.data.vote.id),
        Object.assign({}, action.comment.data.vote),
      ];
    default:
      return state;
  }
}
