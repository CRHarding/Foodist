import axios from 'axios';

class CommentVoteServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getAllVotes() {
    const headers = this.requestHeaders();
    return axios({
      methond: 'GET',
      url: '/api/comment_votes',
      headers: headers,
    })
      .then(votes => {
        return votes;
      })
      .catch(err => {
        return err;
      });
  }

  createVote(vote, bool) {
    console.log(vote, bool);
    const headers = this.requestHeaders();
    let up;
    let down;
    if (bool === 'up') {
      up = true;
      down = false;
    } else {
      up = false;
      down = true;
    }

    return axios({
      method: 'POST',
      url: '/api/comment_votes',
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        voter_id: vote,
        up: up,
        down: down,
      },
    });
  }

  updateVote(vote, bool) {
    console.log(vote, bool);
    const headers = this.requestHeaders();
    let up;
    let down;
    if (bool === 'up') {
      up = true;
      down = false;
    } else {
      up = false;
      down = true;
    }

    return axios({
      method: 'PUT',
      url: `/api/comment_votes/${vote}`,
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        voter_id: vote.id,
        up: up,
        down: down,
      },
    });
  }
}

export default new CommentVoteServices();
