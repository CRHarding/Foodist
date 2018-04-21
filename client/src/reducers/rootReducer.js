import { combineReducers } from 'redux';
import comments from './CommentsReducer';
import recipes from './RecipesReducer';
import session from './sessionReducer';
import votes from './VotesReducer';
import commentVotes from './CommentVotesReducer';

const rootReducer = combineReducers({
  comments,
  recipes,
  session,
  votes,
  commentVotes,
});

export default rootReducer;
