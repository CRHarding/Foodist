import * as types from '../actions/actionTypes';
import initialState from './initialState';
import history from '../components/history';

export default function commentReducer(state = initialState.comments, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments.data;
    case types.CREATE_COMMENT_SUCCESS:
      console.log(action)
      history.push(`/recipes/${action.comment.data.comment.recipe_id}`);
      return [
        ...state.data.filter(comment => comment.id !== action.comment.id),
        Object.assign({}, action.comment),
      ];
    default:
      return state;
  }
}
