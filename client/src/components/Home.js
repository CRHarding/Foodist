import React from 'react';
import VisibleCommentList from './VisibleCommentList';
import VisibleRecipeList from './VisibleRecipeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from './SearchBar';
import '../index.css';

class Home extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestRecipe} />
        <VisibleCommentList comments={this.props.comments} />
        <VisibleRecipeList
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
  console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
