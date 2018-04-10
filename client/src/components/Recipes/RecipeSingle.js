import React, { Component } from 'react';
import ApiServices from '../../services/RecipeServices';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class RecipeSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      id: null,
    };
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    let getId;
    if (!this.props.id) {
      getId = this.props.match.params.id;
    } else {
      getId = this.props.id;
    }
    ApiServices.getOneRecipe(getId)
      .then(recipe => {
        this.setState({
          apiDataLoaded: true,
          apiData: recipe.data.recipe,
          id: getId,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT RECIPESINGLE --->', err);
      });
  }

  deleteRecipe() {
    ApiServices.deleteRecipe(this.state.id)
      .then(data => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN DELETESONG IN RECIPESINGLE', err);
      });
  }

  renderRecipe() {
    return (
      <div className="single-recipe">
        <h2>Author: {this.state.apiData.user_id}</h2>
        <p>Name: {this.state.apiData.name}</p>
        <p>Ingredient List: {this.state.apiData.ingredient_list}</p>
        <p>Instruction List: {this.state.apiData.instruction_list}</p>
        <p>Votes: {this.state.apiData.votes}</p>
        <Link to={`/recipes/${this.state.apiData.id}/edit`}>
          Edit this recipe?
        </Link>
        <button onClick={this.deleteRecipe}>Delete This Recipe?</button>
      </div>
    );
  }

  render() {
    return (
      <div className="single-container">
        {this.state.apiDataLoaded ? this.renderRecipe() : ''}
        {this.state.fireRedirect ? <Redirect to='/recipes'/> : '' }
      </div>
    );
  }
}

export default RecipeSingle;
