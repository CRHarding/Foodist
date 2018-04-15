import axios from 'axios';

class VoteServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getAllVotes() {
    const headers = this.requestHeaders();
    return axios({
      methond: 'GET',
      url: '/api/votes',
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
      url: '/api/votes',
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
    console.log(vote, up, down);
    return axios({
      method: 'PUT',
      url: `/api/votes/${vote}`,
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

export default new VoteServices();
