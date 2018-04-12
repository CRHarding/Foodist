import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({
  onEditClick,
  onDeleteClick,
  onClick,
  id,
  title,
  description,
  comment_votes,
}) => (
  <li onClick={onClick}>
    <div className="single-recipe">
      <h2>Title: {title}</h2>
      <p>Description: {description}</p>
      <p>Votes: {comment_votes}</p>
      <Link to={`/comments/${id}/edit`}>Edit this comment?</Link>
      {' | '}
      <Link to={`/comments/${id}/delete`}>Delete this comment?</Link>
    </div>
  </li>
);

export default Comment;
