import React from 'react';
import { Redirect } from 'react-router-dom';
import ApiServices from '../../services/RecipeServices';

class RecipeAddForm extends React.Component {
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

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    ApiServices.createRecipe(this.state)
      .then(data => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN HANDLEFORMSUBMIT RECIPIEADDFORM --->', err);
      });
  }

  render() {
    return (
      <div className="recipe-form">
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="ingredient_list"
            onChange={this.handleInputChange}
            placeholder="Ingredient List"
          />
          <input
            type="text"
            name="instruction_list"
            onChange={this.handleInputChange}
            placeholder="Instructions"
          />
          <input type="hidden" name="user_id" value='' />
        </form>
        {this.state.fireRedirect ? <Redirect to="/comments" /> : ''}
      </div>
    );
  }
}

export default RecipeAddForm;
