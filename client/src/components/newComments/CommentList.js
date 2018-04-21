import React from 'react';
import { connect } from 'react-redux';
import * as commentActions from '../../actions/commentActions';
import * as voteActions from '../../actions/voteActions';
import { bindActionCreators } from 'redux';

let arr = [];

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: Array.from(this.props.comments),
      user: this.props.user,
      previous_id: this.props.previousCommentId,
      didVote: false,
      userVotes: null,
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
  }

  getCommentById(id) {
    let comment = this.state.comments.find(comment => comment.id === id);
    return Object.assign({}, comment);
  }

  handleClick(comment) {
    this.props.commentSubmit(comment);
  }

  voteUp(comment) {
    console.log(comment);
    this.props.actions.commentActions.updateCommentVotes(comment, 1);
    if (this.state.didVote) {
      this.props.actions.voteActions.updateVote(this.props.userVote.id, 'up');
    } else {
      this.props.actions.voteActions.createVote(comment.id, 'up');
    }
  }

  voteDown(comment) {
    this.props.actions.commentActions.updateCommentVotes(comment, -1);
    if (this.state.didVote) {
      this.props.actions.voteActions.updateVote(this.props.userVote.id, 'down');
    } else {
      this.props.actions.voteActions.createVote(comment.id, 'down');
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
    comment.index = index;
    let canVoteUp;
    let canVoteDown;
    const currentVote = this.getVoteById(id);
    if (currentVote) {
      if (currentVote.down) {
        canVoteUp = true;
      } else if (currentVote.up) {
        canVoteDown = true;
      }
    }

    console.log(comment);

    return (
      <div className="col s9">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text">
            <li key={id}>
              <ul>
                {canVoteUp ? this.renderUpVote(comment) : ''}
                {canVoteDown ? this.renderDownVote(comment) : ''}
              </ul>
              <h3>
                Author: {comment.poster_name} : {comment.index}
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

  getVoteById(id) {
    console.log(this.state.userVotes);
    if (this.state.userVotes) {
      let vote = this.state.userVotes.find(vote => vote.voter_id === id);
      return Object.assign({}, vote);
    }
  }

  renderNonUser(comment, id, index) {
    comment.index = index;
    let canVoteUp;
    let canVoteDown;
    const currentVote = this.getVoteById(id);
    if (currentVote) {
      if (currentVote.down) {
        canVoteUp = true;
      } else if (currentVote.up) {
        canVoteDown = true;
      }
    } else {
      canVoteUp = true;
      canVoteDown = true;
    }

    console.log(comment);
    
    return (
      <div className="col s9">
        <div className="card blue-grey darken-3">
          <div className="card-content white-text">
            <li key={id}>
              <ul>
                {canVoteUp ? this.renderUpVote(comment) : ''}
                {canVoteDown ? this.renderDownVote(comment) : ''}
              </ul>
              <h3>
                Author: {comment.poster_name} : {comment.index}
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
      <div className="row">
        <ul>
          {this.state.comments.map((comment, id) => (
            <div>
              {comment.poster_id === parseInt(sessionStorage.user_id)
                ? this.renderUser(comment, id, 0)
                : this.renderNonUser(comment, id, 0)}
              {comment.next_comment !== 0
                ? this.renderNestedComments(comment, 0)
                : ''}
            </div>
          ))}
          {arr.map((comment, id) => (
            <div className="col s10">
              {comment.poster_id === parseInt(sessionStorage.user_id)
                ? this.renderUser(comment, id)
                : this.renderNonUser(comment, id)}
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

function mapStateToProps(state, ownProps) {
  const userId = parseInt(sessionStorage.user_id);

  let userCommentVotes = {};
  const allComments = state.comments;

  userCommentVotes = collectUserVotes(state.votes, userId);

  return {
    comments: ownProps.comments,
    userVotes: userCommentVotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      commentActions: bindActionCreators(commentActions, dispatch),
      voteActions: bindActionCreators(voteActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
