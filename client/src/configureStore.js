import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as Actions from './actions';
import rootReducer from './reducers/rootReducer';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const configureStore = () => {
  const middlewares = [reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
