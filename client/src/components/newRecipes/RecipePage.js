import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import * as commentActions from '../../actions/commentActions';
import * as voteActions from '../../actions/voteActions';
import CommentList from '../newComments/CommentList';
import RecipeForm from './RecipeForm';
import CommentForm from '../newComments/CommentForm';

class RecipePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      isCommenting: false,
      recipe: this.props.recipe,
      canVote: this.props.canVote,
      canVoteUp: this.props.canVoteUp,
      canVoteDown: this.props.canVoteDown,
      comments: this.props.recipeComments,
      allComments: this.props.allComments,
      userRecipeVote: this.props.userRecipeVotes,
      didVote: this.props.didVote,
      renderFooter: this.props.renderFooter,
      voteMessage: this.props.voteMessage,

      currentComment: null,
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
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
    this.updateRecipeState = this.updateRecipeState.bind(this);
    this.updateCommentState = this.updateCommentState.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.renderCommentForm = this.renderCommentForm.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.showComments = this.showComments.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    console.log(sessionStorage);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let voteMessage;
    let renderFooter;
    let didVote;
    let canVoteDown;
    let canVoteUp;
    let canVote;
    let allComments;
    let comments;
    let recipe;

    if (prevState.recipe.id !== nextProps.recipe.id) {
      recipe = nextProps.recipe;
    } else {
      recipe = prevState.recipe;
    }

    if (prevState.comments && nextProps.comments) {
      if (prevState.comments.length < nextProps.comments.length) {
        comments = nextProps.comments;
      } else {
        comments = prevState.comments;
      }
    }

    if (prevState.allComments) {
      if (prevState.allComments.length < nextProps.allComments.length) {
        allComments = nextProps.allComments;
      } else {
        allComments = prevState.allComments;
      }
    }

    if (prevState.recipe.votes !== nextProps.recipe.votes) {
      recipe.votes = nextProps.recipe.votes;
    } else {
      recipe.votes = prevState.recipe.votes;
    }

    if (prevState.recipe.user_id !== nextProps.recipe.user_id) {
      if (nextProps.recipe.user_id === parseInt(sessionStorage.user_id, 10)) {
        canVote = false;
      } else {
        canVote = true;
      }
    }

    if (prevState.canVoteUp !== nextProps.canVoteUp) {
      canVoteUp = nextProps.canVoteUp;
    } else {
      canVoteUp = prevState.canVoteUp;
    }

    if (prevState.canVoteDown !== nextProps.canVoteDown) {
      canVoteDown = nextProps.canVoteDown;
    } else {
      canVoteDown = prevState.canVoteDown;
    }

    if (prevState.didVote !== nextProps.didVote) {
      didVote = nextProps.didVote;
    } else {
      didVote = prevState.didVote;
    }

    if (prevState.renderFooter !== nextProps.renderFooter) {
      renderFooter = nextProps.renderFooter;
    } else {
      renderFooter = prevState.renderFooter;
    }

    if (prevState.voteMessage !== nextProps.voteMessage) {
      voteMessage = nextProps.voteMessage;
    } else {
      voteMessage = prevState.voteMessage;
    }

    return {
      isEditing: false,
      voteMessage: voteMessage,
      renderFooter: renderFooter,
      didVote: didVote,
      canVoteDown: canVoteDown,
      canVoteUp: canVoteUp,
      canVote: canVote,
      allComments: allComments,
      comments: comments,
      recipe: recipe,
    };
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
    this.props.actions.recipeActions.updateRecipe(this.state.recipe, 0);
  }

  createComment(event) {
    event.preventDefault();
    this.setState({ isCommenting: false });
    let oldComment;
    const comment = this.state.comment;
    console.log('New comment--->', comment);

    if (!this.state.previous_comment) {
      oldComment = 0;
    } else {
      oldComment = this.state.previous_comment;
    }

    comment.previous_comment = oldComment.id;
    comment.recipe_id = this.state.recipe.id;
    comment.poster_id = sessionStorage.user_id;
    comment.poster_name = sessionStorage.name;
    comment.poster_email = sessionStorage.email;
    console.log('Current comment, previous comment--->', comment, oldComment);
    this.props.actions.commentActions.createComment(comment, oldComment);
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderComments() {
    if (this.props.recipeComments.length === 0) {
      return <div>No Comments!</div>;
    }

    return (
      <div className="row">
        <CommentList
          comments={this.props.recipeComments}
          commentSubmit={this.toggleComment}
        />
      </div>
    );
  }

  showComments() {
    this.setState({ showComments: !this.state.showComments });
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

  toggleComment(comment) {
    this.setState({
      isCommenting: !this.state.isCommenting,
      previous_comment: comment,
    });
  }

  voteUp() {
    this.props.actions.recipeActions.updateRecipe(this.state.recipe, 1);
    if (this.state.didVote) {
      this.props.actions.voteActions.updateVote(this.props.userVote.id, 'up');
    } else {
      this.props.actions.voteActions.createVote(this.state.recipe.id, 'up');
    }
  }

  voteDown() {
    this.props.actions.recipeActions.updateRecipe(this.state.recipe, -1);
    if (this.state.didVote) {
      this.props.actions.voteActions.updateVote(this.props.userVote.id, 'down');
    } else {
      this.props.actions.voteActions.createVote(this.state.recipe.id, 'down');
    }
  }

  renderUpVote() {
    return (
      <li onClick={this.voteUp}>
        <i className="material-icons" style={{ cursor: 'pointer' }}>
          keyboard_arrow_up
        </i>
      </li>
    );
  }

  renderDownVote() {
    return (
      <li onClick={this.voteDown}>
        <i className="material-icons" style={{ cursor: 'pointer' }}>
          keyboard_arrow_down
        </i>
      </li>
    );
  }

  renderFooter() {
    return (
      <div>
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
          />
        </div>
      );
    }

    if (!this.state.recipe.id) {
      return <p />;
    }

    return (
      <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <ul>
                <p>
                  {this.state.canVoteUp ? this.renderUpVote() : ''}
                  {this.state.canVoteDown ? this.renderDownVote() : ''}
                  {this.state.voteMessage}
                </p>
              </ul>
              <h4>Name: {this.state.recipe.name}</h4>
              <p>Ingredients: {this.state.recipe.ingredient_list}</p>
              <p>Instructions: {this.state.recipe.instruction_list}</p>
              <p>votes: {this.state.recipe.votes}</p>
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
                {this.state.renderFooter ? this.renderFooter() : ''}
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
    if (comment.recipe_id === id) {
      return comment;
    }
  });

  return selected.filter(el => el !== undefined);
}

function collectUserVotes(votes, recipeId) {
  let selected = votes.map(vote => {
    if (
      vote.user_id === parseInt(sessionStorage.user_id, 10) &&
      vote.voter_id === recipeId
    ) {
      return vote;
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
  let userRecipeVotes = {};
  let canVote = true;
  let canVoteUp = false;
  let canVoteDown = false;
  let didVote = false;
  let renderFooter = false;
  let voteMessage = '';

  const allComments = state.comments;

  const user_id = parseInt(sessionStorage.user_id, 10);
  const recipeId = parseInt(ownProps.match.params.id, 10);

  if (recipeId && state.recipes.length > 0 && state.comments) {
    recipe = getRecipeById(state.recipes, recipeId);
    recipeComments = collectRecipeComments(state.comments, recipeId);
    userRecipeVotes = collectUserVotes(state.votes, recipeId);

    if (recipe.user_id === user_id) {
      canVote = false;
      renderFooter = true;
    } else if (userRecipeVotes[0]) {
      if (userRecipeVotes[0].user_id === user_id) {
        didVote = true;

        if (userRecipeVotes[0].down) {
          canVoteUp = true;
          voteMessage = 'You voted down';
        }

        if (userRecipeVotes[0].up) {
          canVoteDown = true;
          voteMessage = 'You voted up';
        }

        if (!userRecipeVotes[0].up && !userRecipeVotes[0].down) {
          canVoteUp = true;
          canVoteDown = true;
          voteMessage = 'You have no opinion...';
        }
      }
    } else {
      canVoteUp = true;
      canVoteDown = true;
      voteMessage = `You haven't voted yet...`;
    }
  }

  return {
    recipe: recipe,
    recipeComments: recipeComments,
    canVote: canVote,
    userVote: userRecipeVotes[0],
    canVoteUp: canVoteUp,
    canVoteDown: canVoteDown,
    didVote: didVote,
    allComments: allComments,
    renderFooter: renderFooter,
    voteMessage: voteMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      recipeActions: bindActionCreators(recipeActions, dispatch),
      commentActions: bindActionCreators(commentActions, dispatch),
      voteActions: bindActionCreators(voteActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
