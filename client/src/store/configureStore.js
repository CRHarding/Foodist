import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import recipeApp from './reducers';

const configureStore = () => {
  const middlewares = [reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(recipeApp, applyMiddleware(...middlewares));
};

export default configureStore;
