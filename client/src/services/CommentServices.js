import axios from 'axios';

class CommentServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getAllComments() {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      headers: headers,
      url: '/api/comments',
    })
      .then(comments => {
        return comments;
      })
      .catch(err => {
        return err;
      });
  }

  createComment(comment) {
    const headers = this.requestHeaders();
    return axios({
      method: 'POST',
      url: '/api/comments',
      headers: headers,
      data: {
        poster_id: comment.poster_id,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: comment.previous_comment,
        next_comment: comment.next_comment,
        comment_votes: comment.comment_votes,
      },
    });
  }

  editComment(comment, id) {
    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/comments/${id}`,
      headers: headers,
      data: {
        poster_id: comment.poster_id,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: comment.previous_comment,
        next_comment: comment.next_comment,
        comment_votes: comment.comment_votes,
      },
    });
  }

  deleteComment(id) {
    const headers = this.requestHeaders();
    return axios({
      method: 'DELETE',
      url: `/api/comments/${id}`,
      headers: headers,
    });
  }
}

export default new CommentServices();
