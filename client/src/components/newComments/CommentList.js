import React from 'react';
import { connect } from 'react-redux';
import * as commentActions from '../../actions/commentActions';
import * as commentVoteActions from '../../actions/commentVoteActions';
import { bindActionCreators } from 'redux';

let arr = [];

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
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderNestedComments = this.renderNestedComments.bind(this);
    this.renderUpVote = this.renderUpVote.bind(this);
    this.renderDownVote = this.renderDownVote.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    this.getVoteById = this.getVoteById.bind(this);
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
  }

  getCommentById(id) {
    let comment = this.state.comments.find(comment => comment.id === id);
    return Object.assign({}, comment);
  }

  handleClick(comment) {
    this.props.commentSubmit(comment);
  }

  voteUp(comment) {
    this.props.actions.commentActions.updateCommentVotes(comment, 1);
    let userVote = this.getVoteById(comment.id);
    if (userVote.id) {
      this.props.actions.commentVoteActions.updateCommentVote(userVote, 'up');
    } else {
      this.props.actions.commentVoteActions.createCommentVote(comment.id, 'up');
    }
  }

  voteDown(comment) {
    this.props.actions.commentActions.updateCommentVotes(comment, -1);
    let userVote = this.getVoteById(comment.id);
    if (userVote.id) {
      this.props.actions.commentVoteActions.updateCommentVote(userVote, 'down');
    } else {
      this.props.actions.commentVoteActions.createCommentVote(
        comment.id,
        'down',
      );
    }
  }

  renderUpVote(comment) {
    return (
      <li onClick={() => this.voteUp(comment)}>
        <i className="material-icons" style={{ cursor: 'pointer' }}>
          keyboard_arrow_up
        </i>
      </li>
    );
  }

  renderDownVote(comment) {
    return (
      <li onClick={() => this.voteDown(comment)}>
        <i className="material-icons" style={{ cursor: 'pointer' }}>
          keyboard_arrow_down
        </i>
      </li>
    );
  }

  renderNestedComments(comment, index) {
    if (comment.next_comment) {
      return this.renderNestedComments(
        this.getCommentById(comment.next_comment),
        index + 1,
      );
    }

    if (comment.poster_id === parseInt(sessionStorage.user_id)) {
      this.renderUser(comment, comment.id, index);
    } else {
      this.renderNonUser(comment, comment.id, index);
    }
  }

  renderUser(comment, id, index) {
    let cardStyle = {
      margin: '0px 0px 0px 155px',
    };
    return (
      <div className="col s9">
        <div className="card blue-grey lighten-1" style={cardStyle}>
          <div className="card-content white-text">
            <li key={id}>
              <h3>Author: {comment.poster_name}</h3>
              <h4>Title: {comment.title}</h4>
              <p>Comment: {comment.description}</p>
              <p>Votes: {comment.comment_votes}</p>
            </li>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                onClick={() => this.handleClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getVoteById(id) {
    if (this.state.userVotes.length > 0) {
      let vote = this.state.userVotes.find(vote => vote.voter_id === id);
      return Object.assign({}, vote);
    } else {
      return null;
    }
  }

  renderNonUser(comment, id, index) {
    let canVoteUp;
    let canVoteDown;
    let voteMessage;
    const currentVote = this.getVoteById(comment.id);

    if (currentVote) {
      if (currentVote.down) {
        canVoteUp = true;
        voteMessage = 'You voted down';
      } else if (currentVote.up) {
        canVoteDown = true;
        voteMessage = 'You voted up';
      } else {
        canVoteUp = true;
        canVoteDown = true;
        voteMessage = 'You have no opinions...';
      }
    } else {
      canVoteUp = true;
      canVoteDown = true;
      voteMessage = `You haven't voted yet...`;
    }

    index = index * 250;
    index = index.toString();

    let cardStyle = {
      padding: `${index}px`,
    };

    return (
      <div className="col s9">
        <div className="card blue-grey darken-3">
          <div className="card-content white-text">
            <li key={id} style={cardStyle}>
              <ul>
                <p>
                  {canVoteUp ? this.renderUpVote(comment) : ''}
                  {canVoteDown ? this.renderDownVote(comment) : ''}
                  {voteMessage}
                </p>
              </ul>
              <h3>
                Author: {comment.poster_name}
              </h3>
              <h4>Title: {comment.title}</h4>
              <p>Comment: {comment.description}</p>
              <p>Votes: {comment.comment_votes}</p>
            </li>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                onClick={() => this.handleClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <ul>
          {this.state.comments.map((comment, id) => (
            <div className="row">
              {comment.poster_id === parseInt(sessionStorage.user_id)
                ? this.renderUser(comment, id, 0)
                : this.renderNonUser(comment, id, 0)}
              {comment.next_comment !== 0
                ? this.renderNestedComments(comment, 0)
                : ''}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

function collectUserVotes(votes, userId) {
  let selected = votes.map(vote => {
    if (vote.user_id === userId) {
      return vote;
    }
  });
  return selected.filter(el => el !== undefined);
}

function collectBaseComments(comments) {
  let selected = comments.map(comment => {
    if (comment.previous_comment === 0 || !comment.previous_comment) {
      return comment;
    }
  });
  selected = selected.filter(el => el !== undefined)
  return selected;
}

function mapStateToProps(state, ownProps) {
  const userId = parseInt(sessionStorage.user_id);

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

// {arr.map((comment, id) => (
//   <div className="col s10">
//     {comment.poster_id === parseInt(sessionStorage.user_id)
//       ? this.renderUser(comment, id)
//       : this.renderNonUser(comment, id)}
//   </div>
// ))}
