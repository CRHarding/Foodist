import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
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
        <PrivateRoute path="/" component={RecipesPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute
          path="/recipes/new"
          component={NewRecipePage}
        />
        <PrivateRoute
          path="/recipes/:id"
          component={RecipePage}
        />
      </div>
    </Router>
  </Provider>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.jwt ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

export default Root;
