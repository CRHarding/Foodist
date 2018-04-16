import React from 'react';
import RecipePage from './RecipePage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: this.props.recipes,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({ recipes: nextProps.recipes });
    }
  }

  render() {
    return (
      <ul className="list-group">
        {this.state.recipes.map(recipe => (
          <li className="list-group-item" key={recipe.id}>
            <Link to={'/recipes/' + recipe.id}>
              <button className="waves-effect waves-teal btn-flat">
                <i class="material-icons left">cloud</i>
                {recipe.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return {
    recipes: ownProps.recipes,
  };
}

export default connect(mapStateToProps)(RecipeList);
