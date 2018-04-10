import React from 'react';
import ApiServices from '../../services';
import { Redirect } from 'react-router-dom';

class SongEditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      poster_id: '',
      votes: null,
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    ApiServices.getOneComment(this.props.match.params.id)
      .then(comment => {
        this.setState({
          apiDataLoaded: true,
          apiData: comment.data,
          title: comment.data.comment.title,
          description: comment.data.comment.description,
          poster_id: comment.data.comment.poster_id,
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
    ApiServices.editSong(this.state, this.props.match.params.id)
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
        <input
          type="text"
          name="title"
          onChange={this.handleInputChange}
          value={this.state.title}
        />
        <input
          type="text"
          name="description"
          onChange={this.handleInputChange}
          value={this.state.title}
        />
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

export default SongEditForm;
