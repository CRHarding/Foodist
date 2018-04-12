import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import recipeApp from './reducers';
import * as Actions from './actions';

const configureStore = () => {
  const middlewares = [reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(recipeApp, applyMiddleware(...middlewares));

  store.dispatch(Actions.verifyAuth());

  return store;
};

export default configureStore;
