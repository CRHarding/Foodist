import React from 'react';
import ApiServices from '../../services/CommentServices';
import { Redirect } from 'react-router-dom';

class CommentEditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      poster_id: '',
      recipe_id: '',
      previous_comment: null,
      next_comment: null,
      votes: null,
      fireRedirect: false,
      apiDataLoaded: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    ApiServices.getOneComment(this.props.match.params.id)
      .then(comment => {
        console.log(comment);
        this.setState({
          apiDataLoaded: true,
          title: comment.data.comment.title,
          description: comment.data.comment.description,
          poster_id: comment.data.comment.poster_id,
          previous_comment: comment.data.comment.previous_comment,
          recipe_id: comment.data.comment.recipe_id,
          next_comment: comment.data.comment.next_comment,
          comment_votes: comment.data.comment.comment_votes,
        });
      })
      .catch(err => {
        console.log('ERROR IN COMPONENTDIDMOUNT IN COMMENTEDITFORM--->', err);
      });
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    ApiServices.editComment(this.state, this.props.match.params.id)
      .then(comment => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN HANDLEFORMSUBMIT IN COMMENTEDITFORM--->', err);
      });
  }

  renderEditForm() {
    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <p>Title: </p><input
          type="text"
          name="title"
          onChange={this.handleInputChange}
          value={this.state.title}
        />
        <p>Description</p><input
          type="text"
          name="description"
          onChange={this.handleInputChange}
          value={this.state.description}
        />
        <input type="submit" value="Let's edit it" />
      </form>
    );
  }

  render() {
    return (
      <div className="edit-form">
        {this.state.apiDataLoaded ? (
          this.renderEditForm()
        ) : (
          <h1>Loading your data</h1>
        )}
        {this.state.fireRedirect ? (
          <Redirect to={`/comments/${this.props.match.params.id}`} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default CommentEditForm;
