import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import RecipesPage from '../components/newRecipes/RecipesPage';
import RecipePage from '../components/newRecipes/RecipePage';
import { history } from '../configureStore';
import NewRecipePage from '../components/newRecipes/NewRecipePage';
import LogInPage from '../components/LogInPage';
import SignUpPage from '../components/Signup';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={RecipesPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/recipes/new" component={NewRecipePage} />
        <Route path="/recipes/:id" component={RecipePage} />
      </div>
    </Router>
  </Provider>
);

export default Root;
