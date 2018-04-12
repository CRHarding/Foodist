import React from 'react';
import CommentList from '../components/Comments/CommentList';
import RecipeList from '../components/Recipes/RecipeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';
import '../index.css';

class Home extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestRecipe} />
        <CommentList comments={this.props.comments} />
        <RecipeList
          recipes={this.props.recipes}
          onFavoriteSelect={selectedRecipe =>
            this.props.actions.favoriteRecipe({ selectedRecipe })
          }
          onFavoriteDeselect={selectedRecipe =>
            this.props.actions.unfavoriteRecipe({ selectedRecipe })
          }
          isAuthenticated={this.props.authenticated}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    comments: state.comments.data,
    recipes: state.recipes.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
