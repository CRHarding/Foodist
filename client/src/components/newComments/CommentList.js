import React from 'react';
import { connect } from 'react-redux';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: Array.from(this.props.comments),
      user: this.props.user,
      previous_id: this.props.previousCommentId,
    };
    console.log(this.props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== this.props.comments) {
      this.setState({ comments: Array.from(nextProps.comments) });
    }
  }

  handleClick(id) {
    console.log(id);
    this.props.commentSubmit(id);
  }

  renderUser(comment, id) {
    return (
      <div className="card blue-grey lighten-1">
        <div className="card-content white-text">
          <li key={id}>
            <h3>{comment.poster_name}</h3>
            <h4>{comment.title}</h4>
            <p>{comment.description}</p>
          </li>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.handleClick(id)}
            >
              Comment
          </button>
          </div>
        </div>
      </div>
    );
  }

  renderNonUser(comment, id) {
    return (
      <div className="card blue-grey darken-3">
        <div className="card-content white-text">
          <li key={id}>
            <h3>{comment.poster_name}</h3>
            <h4>{comment.title}</h4>
            <p>{comment.description}</p>
          </li>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.handleClick(id)}
            >
              Comment
          </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <ul>
          {this.state.comments.map((comment, id) =>
            <div className="col s6 m6">
              {comment.poster_id === parseInt(sessionStorage.user_id) ? this.renderUser(comment, id) : this.renderNonUser(comment, id)}
            </div>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return {
    comments: ownProps.comments,
  };
}

export default connect(mapStateToProps)(CommentList);
