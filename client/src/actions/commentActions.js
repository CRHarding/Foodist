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

export function createComment(newComment, oldComment) {
  return function (dispatch) {
    return CommentService.createComment(newComment, oldComment)
      .then(newComment => {
        if (oldComment.title) {
          oldComment.next_comments.push(newComment.data.comment.id);
          console.log(oldComment, newComment.data.comment);
          return CommentService.updateComment(oldComment, newComment)
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

export function updateCommentVotes(comment, num) {
  return function(dispatch) {
    return CommentService.updateCommentVotes(comment, num)
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
