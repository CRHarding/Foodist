import React, { Component } from 'react';
import Services from '../../services/RecipeServices';
import Recipe from './RecipeSingle';

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };
  }

  componentDidMount() {
    Services.getAllRecipies()
      .then(comments => {
        this.setState({
          apiDataLoaded: true,
          apiData: recipies.data.recipies,
        });
      })
      .catch(err => {
        console.log('Error in ComponentDidMount RecipeList --->', err);
      });
  }

  renderRecipies() {
    return this.state.apiData.recipies.map(recipie => (
      <Recipe {...recipie} key={recipie.id} />
    ));
  }

  render() {
    return (
      <div className="recipie-list">
        {this.state.apiDataLoaded ? this.renderRecipies() : <h1>Loading...</h1>}
      </div>
    );
  }
}
