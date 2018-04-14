import React from 'react';
import TextInput from '../common/TextInput';

class RecipeForm extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <TextInput
            type="text"
            name="name"
            onChange={this.props.onChange}
            value={this.props.recipe.name}
          />
          <TextInput
            type="text"
            name="ingredient_list"
            onChange={this.props.onChange}
            value={this.props.recipe.ingredient_list}
          />
          <TextInput
            type="text"
            name="instruction_list"
            onChange={this.props.onChange}
            value={this.props.recipe.instruction_list}
          />
          <input
            type="submit"
            disabled={this.props.saving}
            value="Let's edit it"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
}

export default RecipeForm;
