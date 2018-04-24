import React from 'react';

export const Comment = ({ comment, allComments, votes, voteUp, voteDown, commentClick }) => {
  console.log(comment, allComments, votes);
  if (!comment.id) {
    comment = allComments.find(searchComment => searchComment.id === comment);
  }

  console.log(comment);
  const nestedComments = (comment.next_comments || []).map(comment => {
    return (
      <Comment comment={comment} allComments={allComments} votes={votes} />
    );
  });

  if (comment.poster_id === parseInt(sessionStorage.user_id)) {
    return (
      <div className="col s9">
        <div className="card blue-grey lighten-1">
          <div className={'card-content white-text'}>
            <h3>Author: {comment.poster_name}</h3>
            <h4>Title: {comment.title}</h4>
            <p>Comment: {comment.description}</p>
            <p>Votes: {comment.comment_votes}</p>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                commentClick = {() => commentClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
          {nestedComments}
        </div>
      </div>
    );
  } else {
    let canVoteUp;
    let canVoteDown;
    let voteMessage;

    const currentVote = getVoteById(comment.id, votes);

    if (currentVote) {
      if (currentVote.down) {
        canVoteUp = true;
        voteMessage = 'You voted down';
      } else if (currentVote.up) {
        canVoteDown = true;
        voteMessage = 'You voted up';
      } else {
        canVoteUp = true;
        canVoteDown = true;
        voteMessage = 'You have no opinions...';
      }
    } else {
      canVoteUp = true;
      canVoteDown = true;
      voteMessage = `You haven't voted yet...`;
    }
    return (
      <div className="col s9">
        <div className="card blue-grey darken-3">
          <div className={'card-content white-text'}>
            <p>
              {canVoteUp ? renderUpVote(comment, voteUp) : ''}
              {canVoteDown ? renderDownVote(comment, voteDown) : ''}
              {voteMessage}
            </p>
            <h3>Author: {comment.poster_name}</h3>
            <h4>Title: {comment.title}</h4>
            <p>Comment: {comment.description}</p>
            <p>Votes: {comment.comment_votes}</p>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                commentClick={() => commentClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
          {nestedComments}
        </div>
      </div>
    );
  }
};

function getVoteById(id, votes) {
  if (votes.length > 0) {
    let vote = votes.find(vote => vote.voter_id === id);
    if (vote) {
      return Object.assign({}, vote);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function renderUpVote(comment, voteUp) {
  return (
      <i onClick={() => voteUp(comment)} className="material-icons" style={{ cursor: 'pointer' }}>
        keyboard_arrow_up
      </i>
  );
}

function renderDownVote(comment, voteDown) {
  return (
      <i onClick={() => voteDown(comment)} className="material-icons" style={{ cursor: 'pointer' }}>
        keyboard_arrow_down
      </i>
  );
}
