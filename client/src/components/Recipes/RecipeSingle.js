import React, { Component } from 'react';
import ApiServices from '../../services/RecipeServices';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class RecipeSingle extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       favorited: this.props.isFavorite,
//     };
//     this.deleteRecipe = this.deleteRecipe.bind(this);
//   }
//
//   favoriteRecipe() {
//     this.setState({ favorited: true });
//     this.props.onFavoriteSelect(this.props.recipe);
//   }
//
//   unfavoriteRecipe() {
//     this.setState({ favotited: false });
//     this.props.onFavoriteDeselect(this.props.gif);
//   }
//
//   renderFavoriteHeart() {
//     if (!this.props.isAuthenticated) {
//       return '';
//     }
//
//     if (this.state.favorited) {
//       return <p>THIS IS A FAVORITE</p>;
//     }
//   }
//
//   render() {
//     return (
//       <div className="single-recipe">
//         <h2>Author: {this.props.user_id}</h2>
//         <p>Name: {this.props.name}</p>
//         <p>Ingredient List: {this.props.ingredient_list}</p>
//         <p>Instruction List: {this.props.instruction_list}</p>
//         <p>Votes: {this.props.votes}</p>
//         <Link to={`/recipes/${this.props.id}/edit`}>
//           Edit this recipe?
//         </Link>
//         <button onClick={this.deleteRecipe}>Delete This Recipe?</button>
//       </div>
//     );
//   }
}

export default RecipeSingle;
