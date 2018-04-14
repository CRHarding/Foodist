import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';

class NewRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: '',
        ingredient_list: [],
        instruction_list: [],
      },
      saving: false,
    };

    this.saveRecipe = this.saveRecipe.bind(this);
    this.updateRecipeState = this.updateRecipeState.bind(this);
  }

  updateRecipeState(event) {
    const field = event.target.name;
    const recipe = this.state.recipe;
    recipe[field] = event.target.value;
    return this.setState({ recipe: recipe });
  }

  saveRecipe(event) {
    event.preventDefault();
    this.props.actions.createRecipe(this.state.recipe);
  }

  render() {
    return (
      <div>
        <h1>New Recipe:</h1>
        <RecipeForm
          recipe={this.state.recipe}
          onSave={this.saveRecipe}
          onChange={this.updateRecipeState}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch),
  };
}

function mapStateToProps(state, ownProps) {

}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipePage);
