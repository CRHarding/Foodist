import { combineReducers } from 'redux';
import comments from './CommentsReducer';
import recipes from './RecipesReducer';
import session from './sessionReducer';
import votes from './VotesReducer';

const rootReducer = combineReducers({
  comments,
  recipes,
  session,
  votes,
});

export default rootReducer;
