import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecipeList from '../components/Recipes/RecipeList';
import { requestAllRecipes, toggleRecipe } from '../actions/index';

const getVisibleRecipes = (recipes, filter) => {
  switch (filter) {
    case 'SHOW_FAVORITE':
      return recipes.filter(t => t.favorite);
    case 'SHOW_NONFAVORITE':
      return recipes.filter(t => !t.favorite);
    case 'SHOW_ALL':
    default:
      return recipes;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRecipeClick: id => {
      dispatch(toggleRecipe(id));
    },
  };
};

const mapStateToProps = (state = {}, ownProps) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter),
  };
};

const VisibleRecipeList = connect(mapStateToProps, mapDispatchToProps)(
  RecipeList,
);

export default VisibleRecipeList;
