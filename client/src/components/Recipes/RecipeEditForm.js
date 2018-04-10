import React from 'react';
import ApiServices from '../../services/RecipeServices';
import { Redirect } from 'react-router-dom';

class RecipeEditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredient_list: null,
      instruction_list: null,
      user_id: null,
      votes: null,
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    ApiServices.getOneRecipe(this.props.match.params.id)
      .then(recipe => {
        console.log(recipe.data.recipe);
        this.setState({
          apiDataLoaded: true,
          name: recipe.data.recipe.name,
          ingredient_list: recipe.data.recipe.ingredient_list,
          instruction_list: recipe.data.recipe.instruction_list,
          user_id: recipe.data.recipe.user_id,
          votes: recipe.data.recipe.votes,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT IN RECIPEEDITFORM--->', err);
      });
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    ApiServices.editRecipe(this.state, this.props.match.params.id)
      .then(recipe => {
        console.log('UPDATED RECIPE--->', recipe);
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN HANDLEFORMSUBMIT IN RECIPEEDITFORM--->', err);
      });
  }

  renderEditForm() {
    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <p>Name: </p><input
          type="text"
          name="name"
          onChange={this.handleInputChange}
          value={this.state.name}
        />
        <p>Ingredient List: </p><input
          type="text"
          name="ingredient_list"
          onChange={this.handleInputChange}
          value={this.state.ingredient_list}
        />
        <p>Instruction List: </p><input
          type="text"
          name="instruction_list"
          onChange={this.handleInputChange}
          value={this.state.instruction_list}
        />
        <input type="submit" value="Let's edit it" />
      </form>
    );
  }

  render() {
    return (
      <div className="edit-form">
        {this.state.apiDataLoaded ? (
          this.renderEditForm()
        ) : (
          <h1>Loading your data</h1>
        )}
        {this.state.fireRedirect ? (
          <Redirect to={`/recipes/${this.props.match.params.id}`} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default RecipeEditForm;
