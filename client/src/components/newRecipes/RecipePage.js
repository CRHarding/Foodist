import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import * as commentActions from '../../actions/commentActions';
import CommentList from '../newComments/CommentList';
import RecipeForm from './RecipeForm';
import CommentForm from '../newComments/CommentForm';
import history from '../history';

class RecipePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      isCommenting: false,
      saving: false,
      recipe: this.props.recipe,
      comment: {
        title: '',
        description: '',
        poster_id: 0,
        recipe_id: 0,
        previous_comment: null,
        next_comment: null,
        comment_votes: 0,
        showComments: false,
        poster_email: '',
        poster_name: '',
      },
      comments: this.props.recipeComments,
      userComments: this.props.recipeUserComments,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
    this.updateRecipeState = this.updateRecipeState.bind(this);
    this.updateCommentState = this.updateCommentState.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.redirect = this.redirect.bind(this);
    this.renderCommentForm = this.renderCommentForm.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.showComments = this.showComments.bind(this);
    this.renderUserComments = this.renderUserComments.bind(this);
    this.renderOtherComments = this.renderOtherComments.bind(this);
    console.log(sessionStorage);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe.id !== nextProps.recipe.id) {
      this.setState({ recipe: nextProps.recipe });
    } else {
      this.setState({ recipe: this.props.recipe });
    }

    if (this.props.comments) {
      if (this.props.comments.length < nextProps.comments.length) {
        this.setState({ comments: nextProps.comments });
      }
    }

    this.setState({ saving: false, isEditing: false });
  }

  updateRecipeState(event) {
    const field = event.target.name;
    const recipe = this.state.recipe;
    recipe[field] = event.target.value;
    return this.setState({ recipe: recipe });
  }

  updateCommentState(event) {
    const field = event.target.name;
    const comment = this.state.comment;
    comment[field] = event.target.value;
    return this.setState({ comment: comment });
  }

  saveRecipe(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.recipeActions.updateRecipe(this.state.recipe);
  }

  createComment(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.setState({ isCommenting: false });
    const comment = this.state.comment;
    comment.recipe_id = this.state.recipe.id;
    comment.poster_id = sessionStorage.user_id;
    comment.poster_name = sessionStorage.name;
    comment.poster_email = sessionStorage.email;
    console.log(comment);
    this.props.actions.commentActions.createComment(comment);
  }

  deleteRecipe(event) {
    this.props.actions.recipeActions.deleteRecipe(this.state.recipe);
  }

  deleteComment(event) {
    this.props.actions.commentActions.deleteComment(this.state.comment);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  toggleComment() {
    this.setState({ isCommenting: !this.state.isCommenting });
  }

  redirect() {
    history.push('/recipes');
  }

  renderCommentForm() {
    return (
      <div className="row">
        <div className="col s6 m6">
          <div className="card light-grey darken-1">
            <div className="card-content black-text">
              <CommentForm
                recipe={this.state.recipe}
                comment={this.state.comment}
                name={this.state.comment.name}
                description={this.state.comment.description}
                onSave={this.createComment}
                onChange={this.updateCommentState}
                saving={this.state.saving}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  showComments() {
    this.setState({ showComments: !this.state.showComments });
  }

  renderUserComments() {
    return (
      <div className="col s6 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <CommentList comments={this.props.recipeUserComments} />
          </div>
        </div>
      </div>
    )
  }

  renderOtherComments() {
    <div className="col s6 m6">
      <div className="card light-grey darken-1">
        <div className="card-content white-text">
          <CommentList comments={this.props.recipeComments} />
        </div>
      </div>
    </div>
  }

  renderComments() {
    if (
      this.props.recipeUserComments.length === 0 &&
      this.props.recipeComments === 0
    ) {
      return <div>No Comments!</div>;
    }
    return (
      <div className="row">
        {this.props.recipeUserComments.length > 0 ? this.renderUserComments() : ''}
        {this.props.recipeComments.length > 0 ? this.renderOtherComments() : ''}
      </div>
    );
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
            saving={this.state.saving}
          />
        </div>
      );
    }
    if (!this.state.recipe.id) {
      return <p />;
    }
    return (
      <div className="row">
        <div className="col s6 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>
                <a href="#">
                  <i className="material-icons">keyboard_arrow_up</i>
                </a>
                <a href="#">
                  <i className="material-icons">keyboard_arrow_down</i>
                </a>
              </div>
              <h4>Name: {this.state.recipe.name}</h4>
              <p>Ingredients: {this.state.recipe.ingredient_list}</p>
              <p>Instructions: {this.state.recipe.instruction_list}</p>
              <div className="card-action">
                <button
                  className="waves-effect waves-light btn"
                  onClick={this.showComments}
                >
                  {this.state.showComments ? 'Hide' : 'Show'}
                </button>
                <button
                  className="waves-effect waves-light btn"
                  onClick={this.toggleComment}
                >
                  Comment
                </button>
                <button
                  className="waves-effect waves-light btn"
                  onClick={this.toggleEdit}
                >
                  Edit
                </button>
                <button
                  className="waves-effect waves-light btn"
                  onClick={this.deleteRecipe}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.isCommenting ? this.renderCommentForm() : ''}
        {this.state.showComments ? this.renderComments() : ''}
      </div>
    );
  }
}

function collectRecipeComments(comments, id) {
  let selected = comments.map(comment => {
    if (
      comment.recipe_id === id &&
      comment.poster_id !== parseInt(sessionStorage.user_id)
    ) {
      return comment;
    }
  });
  return selected.filter(el => el !== undefined);
}

function collectRecipeUserComments(comments, id) {
  let selected = comments.map(comment => {
    if (
      comment.recipe_id === id &&
      comment.poster_id === parseInt(sessionStorage.user_id)
    ) {
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

  let recipeComments = {};
  let recipeUserComments = {};
  const recipeId = parseInt(ownProps.match.params.id);

  if (recipeId && state.recipes.length > 0 && state.comments) {
    recipe = getRecipeById(state.recipes, recipeId);
    recipeComments = collectRecipeComments(state.comments, recipeId);
    recipeUserComments = collectRecipeUserComments(state.comments, recipeId);
  }

  return {
    recipe: recipe,
    recipeComments: recipeComments,
    recipeUserComments: recipeUserComments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      recipeActions: bindActionCreators(recipeActions, dispatch),
      commentActions: bindActionCreators(commentActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
