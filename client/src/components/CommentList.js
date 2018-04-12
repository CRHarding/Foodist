import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onCommentClick }) => (
  <ul>
    {comments.map((comment, idx) => (
      <Comment
        key={idx}
        {...comment}
        onClick={() => onCommentClick(idx)}
      />
    ))}
  </ul>
);

export default CommentList;
