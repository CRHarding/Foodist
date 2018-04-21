import CommentVoteService from '../services/CommentVoteServices';
import * as types from './actionTypes';

export function loadVotes() {
  return function(dispatch) {
    return CommentVoteService.getAllVotes()
      .then(votes => {
        dispatch(loadVotesSuccess(votes));
      })
      .catch(err => {
        console.log('Error in load votes--->', err);
      });
  };
}

export function updateVote(vote, bool) {
  console.log(vote, bool);
  return function(dispatch) {
    return CommentVoteService.updateVote(vote, bool)
      .then(responseVote => {
        dispatch(updateVoteSuccess(responseVote));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function createVote(vote, bool) {
  console.log(vote, bool);
  return function(dispatch) {
    return CommentVoteService.createVote(vote, bool)
      .then(responseVote => {
        dispatch(createVoteSuccess(responseVote));
        return responseVote;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadVotesSuccess(comments) {
  return { type: types.LOAD_COMMENT_VOTES_SUCCESS, comments };
}

export function updateVoteSuccess(comment) {
  return { type: types.UPDATE_COMMENT_VOTE_SUCCESS, comment };
}

export function createVoteSuccess(comment) {
  return { type: types.CREATE_COMMENT_VOTE_SUCCESS, comment };
}
