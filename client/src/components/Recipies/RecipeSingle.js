import React from 'react';
import Services from '../../services/RecipeServices';

class RecipieSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.deleteRecipie = this.deleteRecipie.bind(this);
  }

  componentDidMount() {
    ApiServices.getOneRecipie(Number(this.props.match.params.id))
      .then(recipe => {
        this.setState({
          apiDataLoaded: true,
          apiData: recipe.data,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT RECIPESINGLE --->', err);
      });
  }

  deleteRecipe() {
    ApiServices.deleteRecipe(this.props.match.params.id)
      .then(data => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN DELETESONG IN RECIPESINGLE');
      });
  }

  renderRecipe() {
    return (
      <div className="single-recipe">
        <h2>Author: {props.user_id}</h2>
        <p>Name: {props.name}</p>
        <p>Ingredient List: {props.ingredient_list}</p>
        <p>Instruction List: {props.instruction_list}</p>
        <p>Votes: {props.votes}</p>
        <Link to={`/recipies/${this.state.apiData.recipe.id}/edit`}>
          Edit this song?
        </Link>
        <button onClick={this.deleteRecipe}>Delete This Recipe?</button>
      </div>
    );
  }

  render() {
    return (
      <div className="single-container">
        {this.state.apiDataLoaded ? this.renderRecipe() : ''}
      </div>
    );
  }
}
