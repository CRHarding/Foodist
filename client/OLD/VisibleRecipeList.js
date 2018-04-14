import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleRecipes, getRecipeErrorMessage, getIsRecipeFetching, getVisibleComments, getCommentErrorMessage, getIsCommentFetching } from '../reducers';
import RecipeList from './RecipeList';
import FetchError from './FetchError';

class VisibleRecipeList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchRecipes } = this.props;
    fetchRecipes(filter);
  }

  render() {
    const { isRecipeFetching, recipeErrorMessage, toggleRecipe, recipes } = this.props;
    if (isRecipeFetching && !recipes.length) {
      return <p>Loading...</p>;
    }
    if (recipeErrorMessage && !recipes.length) {
      return (
        <FetchError message={recipeErrorMessage} onRetry={() => this.fetchData()} />
      );
    }
    return <RecipeList recipes={recipes} onRecipeClick={toggleRecipe} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params || 'all';
  return {
    isRecipeFetching: getIsRecipeFetching(state, filter),
    recipeErrorMessage: getRecipeErrorMessage(state, filter),
    recipes: getVisibleRecipes(state, filter),
    filter,
  };
};

VisibleRecipeList = connect(mapStateToProps, actions)(VisibleRecipeList);

export default VisibleRecipeList;
