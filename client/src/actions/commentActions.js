import CommentService from '../services/CommentServices';
import * as types from './actionTypes';

export function loadComments() {
  return function(dispatch) {
    return CommentService.getAllComments()
      .then(comments => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch(err => {
      });
  };
}

export function createComment(comment) {
  return function(dispatch) {
    return CommentService.createComment(comment)
      .then(responseComment => {
        dispatch(createCommentSuccess(responseComment));
        return responseComment;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment };
}
