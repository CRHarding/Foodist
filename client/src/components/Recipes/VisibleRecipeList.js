import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleRecipes } from '../../reducers';
import RecipeList from './RecipeList';

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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleRecipe, recipes } = this.props;
    return <RecipeList recipes={recipes} onRecipeClick={toggleRecipe} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    recipes: getVisibleRecipes(state, filter),
    filter,
  };
};

VisibleRecipeList = connect(mapStateToProps, actions)(VisibleRecipeList);

export default VisibleRecipeList;
