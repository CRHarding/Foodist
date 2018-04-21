import CommentService from '../services/CommentServices';
import * as types from './actionTypes';

export function loadComments() {
  return function(dispatch) {
    return CommentService.getAllComments()
      .then(comments => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch(err => {});
  };
}

export function createComment(comment, id) {
  return function(dispatch) {
    console.log(comment, id);
    return CommentService.createComment(comment, id)
      .then(newComment => {
        if (id.title) {
          return CommentService.updateComment(comment, newComment)
            .then(responseComment => {
              dispatch(createCommentSuccess(newComment));
              dispatch(updateCommentSuccess(responseComment));
            })
            .catch(err => {
              throw err;
            });
        }
        dispatch(createCommentSuccess(newComment));
        return newComment;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updateComment(comment, nextComment) {
  return function(dispatch) {
    return CommentService.updateComment(comment, nextComment)
      .then(responseComment => {
        dispatch(updateCommentSuccess(responseComment));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updateCommentVotes(comment) {
  return function(dispatch) {
    return CommentService.updateCommentVotes(comment)
      .then(responseComment => {
        dispatch(updateCommentSuccess(responseComment));
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

export function updateCommentSuccess(comment) {
  return { type: types.UPDATE_COMMENT_SUCCESS, comment };
}
