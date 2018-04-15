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
        <h1>Recipes</h1>
        <div className= "row">
          <div className="col s4">
            <div className="card teal lighten-2">
              <div className="card-content white-text">
                <Link to={'/recipes/new'} className="btn btn-primary">
                  Add!
                </Link>
                <RecipeList recipes={this.props.recipes} />
              </div>
            </div>
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
