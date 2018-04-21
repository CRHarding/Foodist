import CommentVoteService from '../services/CommentVoteServices';
import * as types from './actionTypes';

export function loadCommentVotes() {
  return function(dispatch) {
    return CommentVoteService.getAllVotes()
      .then(votes => {
        dispatch(loadCommentVotesSuccess(votes));
      })
      .catch(err => {
        console.log('Error in load votes--->', err);
      });
  };
}

export function updateCommentVote(vote, bool) {
  console.log(vote, bool);
  return function(dispatch) {
    return CommentVoteService.updateVote(vote, bool)
      .then(responseVote => {
        console.log(responseVote);
        dispatch(updateCommentVoteSuccess(responseVote));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function createCommentVote(vote, bool) {
  console.log(vote, bool);
  return function(dispatch) {
    return CommentVoteService.createVote(vote, bool)
      .then(responseVote => {
        dispatch(createCommentVoteSuccess(responseVote));
        return responseVote;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadCommentVotesSuccess(comments) {
  console.log(comments);
  return { type: types.LOAD_COMMENT_VOTES_SUCCESS, comments };
}

export function updateCommentVoteSuccess(comment) {
  return { type: types.UPDATE_COMMENT_VOTE_SUCCESS, comment };
}

export function createCommentVoteSuccess(comment) {
  return { type: types.CREATE_COMMENT_VOTE_SUCCESS, comment };
}
