import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/comments/id" component={CommentSingle} />
      <Route path="/comments/new" component={CommentAddForm} />
      <Route path="/comments/:id/edit" component={CommentEditForm} />
      <Route exact path="/recipies/id" component={RecipieSingle} />
      <Route path="/recipies/new" component={RecipieAddForm} />
      <Route path="/recipies/:id/edit" component={RecipieEditForm} />
    </Switch>
  </Router>
);
