import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';

class RecipesPage extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <h1>Recipes</h1>
        <Link to={'/recipes/new'} className="btn btn-primary">
          Add a recipe!
        </Link>
        <div className="col-md-4">
          <RecipeList recipes={this.props.recipes} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// RecipePage.propTypes = {
//   recipes: PropTypes.object.isRequired,
// };

function mapStateToProps(state, ownProps) {
  return {
    recipes: state.recipes,
    comments: state.comments,
  };
}

export default connect(mapStateToProps)(RecipesPage);
