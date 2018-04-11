import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer';
import CommentsReducer from './CommentsReducer';

const rootReducer = combineReducers({
  comments: CommentsReducer,
  recipes: RecipesReducer,
});

export default rootReducer;
