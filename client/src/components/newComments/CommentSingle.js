import React from 'react';

const CommentSingle = (comment, click, indent) => {
  console.log(comment, click, indent);
  const card = 'card-content white-text col s12 offset-' + indent;
  if (comment.poster_id === parseInt(sessionStorage.user_id)) {
    return (
      <div className="card blue-grey lighten-1">
        <div className={card}>
          <li key={comment.id}>
            <h3>{comment.poster_name}</h3>
            <h4>{comment.title}</h4>
            <p>{comment.description}</p>
          </li>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.click(comment)}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card blue-grey darken-3">
        <div className={card}>
          <li key={comment.id}>
            <h3>{comment.poster_name}</h3>
            <h4>{comment.title}</h4>
            <p>{comment.description}</p>
          </li>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.click(comment)}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CommentSingle;
