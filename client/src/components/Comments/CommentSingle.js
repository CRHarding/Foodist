import React, { Component } from 'react';
import ApiServices from '../../services/CommentServices';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class CommentSingle extends Component {
  constructor(props) {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      id: null,
    };
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    let getId;
    if (!this.props.id) {
      getId = this.props.match.params.id;
    } else {
      getId = this.props.id;
    }

    ApiServices.getOneComment(getId)
      .then(comment => {
        this.setState({
          apiDataLoaded: true,
          apiData: comment.data.comment,
          id: getId,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT COMMENTSINGLE --->', err);
      });
  }

  deleteComment() {
    ApiServices.deleteComment(this.state.id)
      .then(data => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN DELETESONG IN COMMENTSINGLE');
      });
  }

  renderComment() {
    return (
      <div className="single-comment">
        <h1>Title: {this.state.apiData.title}</h1>
        <h2>Author: {this.state.apiData.poster_id}</h2>
        <p>About Recipe: {this.state.apiData.recipe_id}</p>
        <p>Comment: {this.state.apiData.description}</p>
        <p>Votes: {this.state.apiData.comment_votes}</p>
        <Link to={`/comments/${this.state.apiData.id}/edit`}>
          Edit this comment?
        </Link>
        <button onClick={this.deleteComment}>Delete This Comment?</button>
      </div>
    );
  }

  render() {
    return (
      <div className="single-container">
        {this.state.apiDataLoaded ? this.renderComment() : ''}
        {this.state.fireRedirect ? <Redirect to='/comments'/> : '' }
      </div>
    );
  }
}

export default CommentSingle;
