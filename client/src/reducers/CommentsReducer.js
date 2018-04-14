import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentReducer(state = initialState.comments, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments.data;
    default:
      return state;
  }
}
