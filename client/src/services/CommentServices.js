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

  createComment(comment, previousComment) {
    const headers = this.requestHeaders();
    console.log(comment, previousComment);
    return axios({
      method: 'POST',
      url: '/api/comments',
      headers: headers,
      data: {
        poster_email: sessionStorage.email,
        poster_name: sessionStorage.name,
        poster_id: sessionStorage.user_id,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: previousComment.id,
        next_comment: 0,
        comment_votes: 0,
      },
    });
  }

  updateComment(comment, nextComment) {
    console.log(comment.previous_comment, nextComment.data.comment);
    const newComment = nextComment.data.comment;
    if (!newComment) {
      nextComment.id === 0;
    }

    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/comments/${comment.previous_comment.id}`,
      headers: headers,
      data: {
        poster_email: comment.previous_comment.poster_email,
        poster_name: comment.previous_comment.poster_name,
        poster_id: comment.previous_comment.poster_id,
        recipe_id: comment.previous_comment.recipe_id,
        title: comment.previous_comment.title,
        description: comment.previous_comment.description,
        previous_comment: comment.previous_comment.id,
        next_comment: newComment.id,
        comment_votes: comment.previous_comment.comment_votes,
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
        poster_email: sessionStorage.email,
        poster_name: sessionStorage.name,
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
