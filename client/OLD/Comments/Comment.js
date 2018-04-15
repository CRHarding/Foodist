import React from 'react';
import { Link } from 'react-router-dom';

const Comment = props => {
  return (
    <li className="comment">
      <p>
        <Link to={`/comments/${props.id}`}>{props.name}</Link>
      </p>
    </li>
  );
};

export default Comment;
