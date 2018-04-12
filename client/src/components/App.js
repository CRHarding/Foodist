import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import VisibleCommentList from './VisibleCommentList';
import Comment from './Comment';
import VisibleRecipeList from './VisibleRecipeList';
import Recipe from './Recipe';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Favorites from './Favorites';

const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <div className="container">
            <Route exact path="/" component={Home} />
            <PublicRoute
              authenticated={this.props.authenticated}
              path="/signup"
              component={Signup}
            />
            <PublicRoute
              authenticated={this.props.authenticated}
              path="/login"
              component={Login}
            />
            <PrivateRoute
              authenticated={this.props.authenticated}
              path="/favorites"
              component={Favorites}
            />
            <PublicRoute
              authenticated={this.props.authenticated}
              exact
              path="/comments"
              component={VisibleCommentList}
            />
            <PrivateRoute
              exact
              path="/comments/:id"
              component={Comment}
            />
            {/* <PrivateRoute
              authenticated={this.props.authenticated}
              path="/comments/new"
              component={CommentAddForm}
            />
            <PrivateRoute
              authenticated={this.props.authenticated}
              path="/comments/:id/edit"
              component={CommentEditForm}
            /> */}
            <PublicRoute
              authenticated={this.props.authenticated}
              exact
              path="/recipes"
              component={VisibleRecipeList}
            />
            <PrivateRoute
              authenticated={this.props.authenticated}
              exact
              path="/recipes/:id"
              component={Recipe}
            />
            {/* <PrivateRoute
              authenticated={this.props.authenticated}
              path="/recipes/new"
              component={RecipeAddForm}
            />
            <PrivateRoute
              authenticated={this.props.authenticated}
              path="/recipes/:id/edit"
              component={RecipeEditForm}
            /> */}
          </div>
          <VisibleCommentList comments={this.props.comments} />
          <VisibleRecipeList
            recipes={this.props.recipes}
            onFavoriteSelect={selectedRecipe =>
              this.props.actions.favoriteRecipe({ selectedRecipe })
            }
            onFavoriteDeselect={selectedRecipe =>
              this.props.actions.unfavoriteRecipe({ selectedRecipe })
            }
            isAuthenticated={this.props.authenticated}
          />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
