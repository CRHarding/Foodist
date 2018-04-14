import React from 'react';

const CommentList = ({ comments }) => {
  console.log(comments);
  comments = Array.from(comments)
  if (comments.length === 0) return <h3>No comments!</h3>;
  else {
    return (
      <div>
        <ul>
          {comments.map(comment => <li key={comment.id}>{comment.title}</li>)}
        </ul>
      </div>
    );
  }
};

export default CommentList;
