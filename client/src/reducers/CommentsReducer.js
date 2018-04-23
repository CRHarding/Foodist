import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentReducer(state = initialState.comments, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments.data.data;
    case types.CREATE_COMMENT_SUCCESS:
      return [
        ...state.filter(
          comment => comment.id !== action.comment.data.comment.id,
        ),
        Object.assign({}, action.comment.data.comment),
      ];
    case types.UPDATE_COMMENT_SUCCESS:
      return [
        ...state.filter(
          comment => comment.id !== action.comment.data.comment.id,
        ),
        Object.assign({}, action.comment.data.comment),
      ];
    default:
      return state;
  }
}
