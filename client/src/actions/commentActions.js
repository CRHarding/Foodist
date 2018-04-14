import CommentService from '../services/CommentServices';
import * as types from './actionTypes';

export function loadComments() {
  return function(dispatch) {
    return CommentService.getAllComments()
      .then(comments => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch(err => {
        console.log('Error in load comments--->', err);
      });
  };
}

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}
