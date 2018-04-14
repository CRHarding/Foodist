import { combineReducers } from 'redux';
import comments from './CommentsReducer';
import recipes from './RecipesReducer';

const rootReducer = combineReducers({
  comments,
  recipes,
});

export default rootReducer;
