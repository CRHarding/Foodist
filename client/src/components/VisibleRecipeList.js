import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleRecipes, getErrorMessage, getIsFetching } from '../reducers';
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
    const { isFetching, errorMessage, toggleRecipe, recipes } = this.props;
    if (isFetching && !recipes.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !recipes.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
    }
    return <RecipeList recipes={recipes} onRecipeClick={toggleRecipe} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params || 'all';
  return {
    isFetching: getIsFetching(state, filter),
    errorMessgae: getErrorMessage(state, filter),
    recipes: getVisibleRecipes(state, filter),
    filter,
  };
};

VisibleRecipeList = connect(mapStateToProps, actions)(VisibleRecipeList);

export default VisibleRecipeList;
