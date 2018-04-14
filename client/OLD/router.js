import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import CommentList from './components/Comments/CommentList';
import CommentSingle from './components/Comments/CommentSingle';
import CommentAddForm from './components/Comments/CommentAddForm';
import CommentEditForm from './components/Comments/CommentEditForm';
import RecipeList from './components/Recipes/RecipeList';
import RecipeSingle from './components/Recipes/RecipeSingle';
import RecipeAddForm from './components/Recipes/RecipeAddForm';
import RecipeEditForm from './components/Recipes/RecipeEditForm';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/comments" component={CommentList} />
      <Route exact path="/comments/:id" component={CommentSingle} />
      <Route path="/comments/new" component={CommentAddForm} />
      <Route path="/comments/:id/edit" component={CommentEditForm} />
      <Route exact path="/recipes" component={RecipeList} />
      <Route exact path="/recipes/:id" component={RecipeSingle} />
      <Route path="/recipes/new" component={RecipeAddForm} />
      <Route path="/recipes/:id/edit" component={RecipeEditForm} />
    </Switch>
  </Router>
);
