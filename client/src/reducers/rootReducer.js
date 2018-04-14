import { combineReducers } from 'redux';
import comments from './CommentsReducer';
import recipes from './RecipesReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  comments,
  recipes,
  session,
});

export default rootReducer;
