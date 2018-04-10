import axios from 'axios';

class Services {
  getAllSongs() {
    return axios.get('/api/songs');
  }

  getOneSong() {
    return axios.get(`/api/songs${id}`);
  }

  createComment(comment) {
    return axios({
      method: 'POST',
      url: '/api/comments',
      data: {
        poster_id: comment.poster_id,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: previous_comment,
        next_comment: next_comment,
        comment_votes: comment.comment_votes,
      },
    });
  }

  editComment(comment, id) {
    return axios({
      method: 'PUT',
      url: `/api/comments/${id}`,
      data: {
        title: comment.title,
        description: comment.description,
        comment_votes: comment.comment_votes,
      },
    });
  }

  deleteComment(id) {
    return axios({
      method: 'DELETE',
      url: `/api/comments/${id}`,
    });
  }
}

export default new Services();
