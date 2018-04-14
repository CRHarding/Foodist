import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onEditClick, toggle }) => (
  <ul>
    {comments.map((comment, idx) => (
      <Comment
        key={idx}
        {...comment}
        onClick={() => onEditClick(idx)}
        toggleThis = {toggle}
      />
    ))}
  </ul>
);

export default CommentList;
