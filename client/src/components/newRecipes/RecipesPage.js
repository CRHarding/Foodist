import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import Header from '../common/Header';

class RecipesPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className= "row">
          <div className="col s4 md6">
            <h1>Recipes</h1>
            <Link to={'/recipes/new'} className="btn btn-primary">
              Add a recipe!
            </Link>
            <RecipeList recipes={this.props.recipes} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    recipes: state.recipes,
    comments: state.comments,
  };
}

export default connect(mapStateToProps)(RecipesPage);
