import React from 'react';
import { Redirect } from 'react-router-dom';
import ApiServices from '../../services/CommentServices';

class CommentAddForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      poster_id: null,
      recipe_id: null,
      votes: null,
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    ApiServices.createComment(this.state)
      .then(data => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN HANDLEFORMSUBMIT COMMENTADDFORM --->', err);
      });
  }

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="title"
            onChange={this.handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            onChange={this.handleInputChange}
            placeholder="Comment"
          />
          <input
            type="integer"
            name="votes"
            onChange={this.handleInputChange}
            placeholder="Title"
          />
          <input type="hidden" name="poster_id" value={current_user} />
          <input type="hidden" name="recipe_id" value={current_recipe} />
          <input
            type="hidden"
            name="previous_comment"
            value={previous_comment}
          />
        </form>
        {this.state.fireRedirect ? <Redirect to="/comments" /> : ''}
      </div>
    );
  }
}

export default CommentAddForm;
