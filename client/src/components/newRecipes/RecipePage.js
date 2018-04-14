import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import CommentList from '../newComments/CommentList';
import RecipeForm from './RecipeForm';

class RecipePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      recipe: this.props.recipe,
      comments: this.props.Recipecomments,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateRecipeState = this.updateRecipeState.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe.id !== nextProps.recipe.id) {
      this.setState({ recipe: nextProps.recipe });
    }

    if (this.props.comments) {
      if (this.props.comments.length < nextProps.comments.length) {
        this.setState({ comments: nextProps.comments });
      }
    }
  }

  updateRecipeState(event) {
    const field = event.target.name;
    const recipe = this.state.recipe;
    recipe[field] = event.target.value;
    return this.setState({ recipe: recipe });
  }

  saveRecipe(event) {
    event.preventDefault();
    this.props.actions.updateRecipe(this.state.recipe);
  }

  deleteRecipe(event) {
    this.props.actions.deleteRecipe(this.state.recipe);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <h1>Edit Recipe</h1>
          <RecipeForm
            recipe={this.state.recipe}
            name={this.state.recipe.name}
            ingredient_list={this.state.recipe.ingredient_list}
            instruction_list={this.state.recipe.instruction_list}
            onSave={this.saveRecipe}
            onChange={this.updateRecipeState}
          />
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <h4>Name: {this.state.recipe.name}</h4>
              <p>Ingredients: {this.state.recipe.ingredient_list}</p>
              <p>Instructions: {this.state.recipe.instruction_list}</p>
              <p>Votes: {this.state.recipe.votes}</p>
              <span classname="card-title activator grey-text text-darken-4">Comments<i classname="material-icons right"></i></span>
              <div classname="card-reveal">
                <span className="card-title grey-text text-darken-4">Comments<i className="material-icons right">close</i></span>
                <CommentList comments={this.props.Recipecomments} />
              </div>
              <div className="card-action">
                <button className="waves-effect waves-light btn" onClick={this.toggleEdit}>Edit</button>
                <button className="waves-effect waves-light btn" onClick={this.deleteRecipe}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function collectRecipeComments(comments, recipe, id) {
  let selected = comments.map(comment => {
    if (comment.recipe_id === id) {
      return comment;
    }
  });
  return selected.filter(el => el !== undefined);
}

function getRecipeById(recipes, id) {
  let recipe = recipes.find(recipe => recipe.id === id);
  return Object.assign({}, recipe);
}

function mapStateToProps(state, ownProps) {
  let recipe = {
    name: '',
    ingredient_list: '',
    instruction_list: '',
    user_id: '',
    votes: '',
  };
  let Recipecomments = {};
  const recipeId = parseInt(ownProps.match.params.id);

  if (recipeId && state.recipes.length > 0 && state.comments.length > 0) {
    recipe = getRecipeById(state.recipes, recipeId);
    Recipecomments = collectRecipeComments(state.comments, recipe, recipeId);
  }
  console.log(Recipecomments);
  return { recipe: recipe, Recipecomments: Recipecomments };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
