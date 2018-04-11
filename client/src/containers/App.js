import React from 'react';
import CommentList from '../components/Comments/CommentList';
import RecipeList from '../components/Recipes/RecipeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';
import '../index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestRecipes} />
        <CommentList comments={this.props.comments} />
        <RecipeList recipes={this.props.recipes} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments.data,
    recipes: state.recipes.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
