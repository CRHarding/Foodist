import VoteService from '../services/VoteServices';
import * as types from './actionTypes';

export function loadVotes() {
  return function(dispatch) {
    return VoteService.getAllVotes()
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
    return VoteService.updateVote(vote, bool)
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
    return VoteService.createVote(vote, bool)
      .then(responseVote => {
        dispatch(createVoteSuccess(responseVote));
        return responseVote;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadVotesSuccess(recipes) {
  return { type: types.LOAD_VOTES_SUCCESS, recipes };
}

export function updateVoteSuccess(recipe) {
  return { type: types.UPDATE_VOTE_SUCCESS, recipe };
}

export function createVoteSuccess(recipe) {
  return { type: types.CREATE_VOTE_SUCCESS, recipe };
}
