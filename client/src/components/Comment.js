import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCommentSubmit } from '../actions';

const renderEditForm = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(editCommentSubmit(input.value));
        }}
        className="form"
      >
        <p>Title: </p>
        <input
          type="text"
          name="title"
          onChange={this.handleInputChange}
          value={this.state.title}
        />
        <p>Description</p>
        <input
          type="text"
          name="description"
          onChange={this.handleInputChange}
          value={this.state.description}
        />
        <input type="submit" value="Let's edit it" />
      </form>
    </div>
  );
};

const Comment = ({
  onClick,
  id,
  title,
  description,
  comment_votes,
  toggleThis,
}) => (
  <div className="row" onClick={onClick}>
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <h2>Title: {title}</h2>
          <p>Description: {description}</p>
          <p>Votes: {comment_votes}</p>
          {toggleThis ? { renderEditForm } : ''}
        </div>
        <div className="card-action">
          <Link to={`/comments/${id}/delete`}>Delete this comment?</Link>
        </div>
      </div>
    </div>
  </div>
);

export default connect()(Comment);
