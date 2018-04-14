import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  const middlewares = [reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
