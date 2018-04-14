import React from 'react';

const CommentList = ({ comments }) => {
  comments = Array.from(comments)
  console.log(comments);
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
