import React, { Component } from 'react';
import Services from '../../services';
import Comment from './CommentSingle';

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };
  }

  componentDidMount() {
    Services.getAllComments()
      .then(comments => {
        this.setState({
          apiDataLoaded: true,
          apiData: comments.data.comments,
        });
      })
      .catch(err => {
        console.log('Error in ComponentDidMount CommentList --->', err);
      });
  }

  renderComments() {
    return this.state.apiData.comments.map(comment => (
      <Comment {...comment} key={comment.id} />
    ));
  }

  render() {
    return (
      <div className="comment-list">
        {this.state.apiDataLoaded ? this.renderSongs() : <h1>Loading...</h1>}
      </div>
    );
  }
}
