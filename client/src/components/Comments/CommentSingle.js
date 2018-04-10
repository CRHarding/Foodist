import React from 'react';
import Services from '../../services/CommentServices';

class CommentSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    ApiServices.getOneComment(Number(this.props.match.params.id))
      .then(comment => {
        this.setState({
          apiDataLoaded: true,
          apiData: comment.data,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT COMMENTSINGLE --->', err);
      });
  }

  deleteComment() {
    ApiServices.deleteComment(this.props.match.params.id)
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
        <h2>Author: {props.poster_id}</h2>
        <p>About Recipe: {props.recipe_id}</p>
        <p>Comment: {props.description}</p>
        <p>Votes: {props.comment_votes}</p>
        <Link to={`/comments/${this.state.apiData.comment.id}/edit`}>
          Edit this song?
        </Link>
        <button onClick={this.deleteComment}>Delete This Comment?</button>
      </div>
    );
  }

  render() {
    return (
      <div className="single-container">
        {this.state.apiDataLoaded ? this.renderSong() : ''}
      </div>
    );
  }
}
