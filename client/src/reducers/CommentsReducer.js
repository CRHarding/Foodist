import * as types from '../actions/actionTypes';
import initialState from './initialState';
import history from '../components/history';

export default function commentReducer(state = initialState.comments, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments.data.data;
    case types.CREATE_COMMENT_SUCCESS:
      history.push(`/recipes/${action.comment.data.comment.recipe_id}`);
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
