import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import RecipesPage from '../components/newRecipes/RecipesPage';
import RecipePage from '../components/newRecipes/RecipePage';
import history from '../components/history';
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
        <Route path="/recipes/new" component={NewRecipePage} onEnter={requireAuth}/>
        <Route path="/recipes/:id" component={RecipePage} onEnter={requireAuth}/>
      </div>
    </Router>
  </Provider>
);

function requireAuth(nextState, replace) {
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export default Root;
