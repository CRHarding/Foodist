import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import RecipeList from '../components/Recipes/RecipeList';

class Favorites extends React.Component {
  componentWillMount() {
    this.props.actions.fetchFavoritedRecipes();
  }

  render() {
    return (
      <div>
        <RecipeList
          recipes={this.props.recipes}
          onFavoriteSelect={selectedRecipe =>
            this.props.actions.favoriteRecipe({ selectedRecipe })
          }
          onFavoriteDeselect={selectedRecipe =>
            this.props.actions.unfavoriteRecipe({ selectedRecipe })
          }
          isAuthenticated={this.props.authenticated}
          isFavorite={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    recipes: state.recipes.favorites,
    selectedRecipe: state.selectedRecipe,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
