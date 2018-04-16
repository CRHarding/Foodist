import React from 'react';
import TextInput from '../common/TextInput';

class RecipeForm extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <TextInput
            type="text"
            title="Name"
            name="name"
            onChange={this.props.onChange}
            value={this.props.recipe.name}
          />
          <TextInput
            type="text"
            title="Ingredient List"
            name="ingredient_list"
            onChange={this.props.onChange}
            value={this.props.recipe.ingredient_list}
          />
          <TextInput
            type="text"
            title="Instruction List"
            name="instruction_list"
            onChange={this.props.onChange}
            value={this.props.recipe.instruction_list}
          />
          <input
            type="submit"
            disabled={this.props.saving}
            value="Submit"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
}

export default RecipeForm;
