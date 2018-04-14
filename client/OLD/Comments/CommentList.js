import React, { Component } from 'react';
import Services from '../../services/CommentServices';
import Comment from './CommentSingle';

const CommentList = props => {
  console.log(props);
  const commentItems = props.comments.map(comment => {
    return this.props.map(comment => (
      <Comment
        {...comment}
        id={comment.id}
        key={comment.id}
        isAuthenitcated={props.isAuthenticated}
      />
    ));
  });

  return (
    <div className="comment-list">{commentItems}</div>
  )
};

export default CommentList;
