import React from 'react';
import Services from '../../services';

class CommentSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.deleteSong = this.deleteSong.bind(this);
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

  deleteSong() {
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

  renderSong() {
    return (
      <div className="single-comment">
        <h2>Author: {props.poster_id}</h2>
        <p>About Recipe: {props.recipe_id}</p>
        <p>Comment: {props.description}</p>
        <p>Votes: {props.comment_votes}</p>
        <Link to={`/songs/${this.state.apiData.song.id}/edit`}>
          Edit this song?
        </Link>
        <button onClick={this.deleteSong}>Delete This Song?</button>
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
