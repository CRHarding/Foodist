import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import NewRoot from './containers/NewRoot';
import configureStore from './configureStore';
import { loadRecipes } from './actions/recipeActions';
import { loadComments } from './actions/commentActions';
import { loadVotes } from './actions/voteActions';
import { loadCommentVotes } from './actions/commentVoteActions';

const store = configureStore();

store.dispatch(loadComments());
store.dispatch(loadRecipes());
store.dispatch(loadVotes());
store.dispatch(loadCommentVotes());

render(<NewRoot store={store} />, document.getElementById('root'));
