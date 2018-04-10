import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/comments/id" component={SongSingle} />
      <Route path="/comments/new" component={CommentAddForm} />
      <Route path="/comments/:id/edit" component={SongEditForm} />
    </Switch>
  </Router>
);
