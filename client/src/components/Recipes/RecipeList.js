import React, { Component } from 'react';
import Services from '../../services/RecipeServices';
import Recipe from './RecipeSingle';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };
    this.renderRecipes = this.renderRecipes.bind(this);
  }

  componentDidMount() {
    Services.getAllRecipes()
      .then(recipes => {
        this.setState({
          apiDataLoaded: true,
          apiData: recipes.data.data,
        });
      })
      .catch(err => {
        console.log('Error in ComponentDidMount RecipeList --->', err);
      });
  }

  renderRecipes() {
    return this.state.apiData.map(recipe => (
      <Recipe {...recipe} id={recipe.id} />
    ));
  }

  render() {
    return (
      <div className="recipe-list">
        {this.state.apiDataLoaded ? this.renderRecipes() : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default RecipeList;
