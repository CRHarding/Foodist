import React from 'react';

const CommentList = ({ comments }) => {
  comments = Array.from(comments);
  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <h3>{comment.poster_name}</h3>
            <h4>{comment.title}</h4>
            <p>{comment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
