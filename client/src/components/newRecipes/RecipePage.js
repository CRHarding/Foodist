import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import * as commentActions from '../../actions/commentActions';
import * as voteActions from '../../actions/voteActions';
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
      canVote: this.props.canVote,
      canVoteUp: this.props.canVoteUp,
      canVoteDown: this.props.canVoteDown,
      comments: this.props.recipeComments,
      allComments: this.props.allComments,
      userVote: this.props.userVotes,
      didVote: this.props.didVote,
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
    this.redirect = this.redirect.bind(this);
    this.renderCommentForm = this.renderCommentForm.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.showComments = this.showComments.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
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

    if (this.props.allComments) {
      if (this.props.allComments.length < nextProps.allComments.length) {
        this.setState({ allComments: nextProps.allComments });
      }
    }

    if (this.props.recipe.votes !== nextProps.recipe.votes) {
      this.setState({ recipe: nextProps.recipe });
    } else {
      this.setState({ recipe: this.props.recipe });
    }

    if (this.props.recipe.user_id !== nextProps.recipe.user_id) {
      if (nextProps.recipe.user_id === parseInt(sessionStorage.user_id)) {
        this.setState({ canVote: false });
      } else {
        this.setState({ canVote: true });
      }
    }

    if (this.props.canVoteUp !== nextProps.canVoteUp) {
      this.setState({ canVoteUp: nextProps.canVoteUp });
    }

    if (this.props.canVoteDown !== nextProps.canVoteDown) {
      this.setState({ canVoteDown: nextProps.canVoteDown });
    }

    if (this.props.didVote !== nextProps.didVote) {
      this.setState({ didVote: nextProps.didVote });
    }

    this.setState({ saving: false, isEditing: false });
    console.log(this.state);
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
    this.props.actions.recipeActions.updateRecipe(this.state.recipe, 0);
  }

  createComment(event) {
    event.preventDefault();
    this.setState({ saving: true, isCommenting: false });

    const comment = this.state.comment;
    const oldComment = this.state.previous_comment
    console.log(this.state.allComments);
    comment.previous_comment = oldComment;
    comment.recipe_id = this.state.recipe.id;
    comment.poster_id = sessionStorage.user_id;
    comment.poster_name = sessionStorage.name;
    comment.poster_email = sessionStorage.email;
    const newComment = this.props.actions.commentActions.createComment(
      comment,
      oldComment,
    );
    // if (oldComment.id !== 0) {
    //   this.props.actions.commentActions.updateComment(
    //     oldComment,
    //     newComment,
    //   );
    // }
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

  renderComments() {
    if (this.props.recipeComments === 0) {
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

  redirect() {
    history.push('/recipes');
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
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <ul>
                {this.state.canVoteUp ? this.renderUpVote() : ''}
                {this.state.canVoteDown ? this.renderDownVote() : ''}
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
    if (comment.recipe_id === id) {
      return comment;
    }
  });

  return selected.filter(el => el !== undefined);
}

function collectUserVotes(votes, recipeId) {
  let selected = votes.map(vote => {
    if (
      vote.user_id === parseInt(sessionStorage.user_id) &&
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

function getVoteId(votes) {
  let voteId = votes;
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
  let userVotes = {};
  let canVote = true;
  let canVoteUp = false;
  let canVoteDown = false;
  let didVote = false;

  const allComments = state.comments;

  const user_id = parseInt(sessionStorage.user_id);
  const recipeId = parseInt(ownProps.match.params.id);

  if (recipeId && state.recipes.length > 0 && state.comments) {
    recipe = getRecipeById(state.recipes, recipeId);
    recipeComments = collectRecipeComments(state.comments, recipeId);
    userVotes = collectUserVotes(state.votes, recipeId);

    if (recipe.user_id === user_id) {
      canVote = false;
    } else if (userVotes[0]) {
      if (userVotes[0].user_id === user_id) {
        didVote = true;

        if (userVotes[0].down) {
          canVoteUp = true;
        }

        if (userVotes[0].up) {
          canVoteDown = true;
        }

        if (!userVotes[0].up && !userVotes[0].down) {
          canVoteUp = true;
          canVoteDown = true;
        }
      }
    } else {
      canVoteUp = true;
      canVoteDown = true;
    }
  }

  return {
    recipe: recipe,
    recipeComments: recipeComments,
    canVote: canVote,
    userVote: userVotes[0],
    canVoteUp: canVoteUp,
    canVoteDown: canVoteDown,
    didVote: didVote,
    allComments: allComments,
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
