import React from 'react';
import { connect } from 'react-redux';
import * as commentActions from '../../actions/commentActions';
import * as commentVoteActions from '../../actions/commentVoteActions';
import { bindActionCreators } from 'redux';
import { Comment } from './Comment';
import CommentForm from './CommentForm';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: Array.from(this.props.comments),
      user: this.props.user,
      previous_id: this.props.previousCommentId,
      userVotes: this.props.userVotes,
      canVoteUp: this.props.canVoteUp,
      canVoteDown: this.props.canVoteDown,
      toggleComment: false,
      recipe: this.props.recipe,
    };
    this.handleClick = this.handleClick.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== this.props.comments) {
      this.setState({ comments: Array.from(nextProps.comments) });
    }

    if (nextProps.userVotes !== this.props.userVotes) {
      this.setState({ userVotes: nextProps.userVotes });
    }

    if (this.props.canVoteUp !== nextProps.canVoteUp) {
      this.setState({ canVoteUp: nextProps.canVoteUp });
    }

    if (this.props.canVoteDown !== nextProps.canVoteDown) {
      this.setState({ canVoteDown: nextProps.canVoteDown });
    }

    if (this.props.toggleComment !== nextProps.toggleComment) {
      this.setState({ toggleComment: nextProps.toggleComment });
    }
  }

  handleClick(comment) {
    this.props.commentSubmit(comment);
  }

  getVoteById(id) {
    if (this.state.userVotes.length > 0) {
      let vote = this.state.userVotes.find(vote => vote.voter_id === id);
      if (vote) {
        return Object.assign({}, vote);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  voteUp(comment) {
    this.props.actions.commentActions.updateCommentVotes(comment, 1);
    let userVote = this.getVoteById(comment.id);
    console.log(userVote);
    if (userVote && userVote.id) {
      this.props.actions.commentVoteActions.updateCommentVote(userVote, 'up');
    } else {
      this.props.actions.commentVoteActions.createCommentVote(comment.id, 'up');
    }
  }

  voteDown(comment) {
    this.props.actions.commentActions.updateCommentVotes(comment, -1);
    let userVote = this.getVoteById(comment.id);
    console.log(userVote);
    if (userVote) {
      this.props.actions.commentVoteActions.updateCommentVote(userVote, 'down');
    } else {
      this.props.actions.commentVoteActions.createCommentVote(
        comment.id,
        'down',
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.comments.map(comment => {
            return (
              <Comment
                comment={comment}
                allComments={this.state.comments}
                votes={this.state.userVotes}
                voteUp={this.voteUp}
                voteDown={this.voteDown}
                commentClick={() => this.handleClick(comment)}
                recipe={this.state.recipe}
                createComment
                updateCommentState
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function collectUserVotes(votes, userId) {
  let selected = votes.filter(vote => vote.user_id === userId);
  return selected;
}

function collectBaseComments(comments) {
  let selected = comments.map(comment => {
    if (comment.previous_comment === 0 || !comment.previous_comment) {
      return comment;
    }
  });
  selected = selected.filter(el => el !== undefined);
  return selected;
}

function mapStateToProps(state, ownProps) {
  const userId = parseInt(sessionStorage.user_id, 10);

  let userCommentVotes = {};
  const allComments = ownProps.comments;
  const baseComments = collectBaseComments(allComments);
  userCommentVotes = collectUserVotes(state.commentVotes, userId);

  return {
    baseComments: baseComments,
    comments: allComments,
    userVotes: userCommentVotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      commentActions: bindActionCreators(commentActions, dispatch),
      commentVoteActions: bindActionCreators(commentVoteActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
