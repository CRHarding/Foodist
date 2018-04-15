import React from 'react';

const CommentList = ({ comments, user }) => {
  comments = Array.from(comments);

  if (user === 'true') {
    return (
      <div className="row">
        <ul>
          {comments.map(comment => (
            <div className="col s6 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <li key={comment.id}>
                    <h3>{comment.poster_name}</h3>
                    <h4>{comment.title}</h4>
                    <p>{comment.description}</p>
                  </li>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="row">
      <ul>
        {comments.map(comment => (
          <div className="col s6 m6">
            <div className="card blue-grey darken-3">
              <div className="card-content white-text">
                <li key={comment.id}>
                  <h3>{comment.poster_name}</h3>
                  <h4>{comment.title}</h4>
                  <p>{comment.description}</p>
                </li>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
