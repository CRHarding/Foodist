import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import NewRoot from './containers/NewRoot';
import configureStore from './configureStore';
import { loadRecipes } from './actions/recipeActions';
import { loadComments } from './actions/commentActions';

const store = configureStore();

store.dispatch(loadRecipes());
store.dispatch(loadComments());

render(<NewRoot store={store} />, document.getElementById('root'));
