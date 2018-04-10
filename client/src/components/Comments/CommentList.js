import React, { Component } from 'react';
import Services from '../../services/CommentServices';
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
          apiData: comments.data.data,
        });
      })
      .catch(err => {
        console.log('Error in ComponentDidMount CommentList --->', err);
      });
  }

  renderComments() {
    return this.state.apiData.map(comment => (
      <Comment {...comment} id={comment.id} />
    ));
  }

  render() {
    return (
      <div className="comment-list">
        {this.state.apiDataLoaded ? this.renderComments() : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default CommentList;
