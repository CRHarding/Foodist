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

  createComment(newComment, oldComment) {
    const headers = this.requestHeaders();
    return axios({
      method: 'POST',
      url: '/api/comments',
      headers: headers,
      data: {
        poster_email: sessionStorage.email,
        poster_name: sessionStorage.name,
        poster_id: sessionStorage.user_id,
        recipe_id: newComment.recipe_id,
        title: newComment.title,
        description: newComment.description,
        previous_comment: oldComment.id,
        next_comments: [],
        comment_votes: 0,
      },
    });
  }

  updateComment(oldComment, nextComment) {
    console.log(oldComment, nextComment);
    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/comments/${oldComment.id}`,
      headers: headers,
      data: {
        poster_email: oldComment.previous_comment.poster_email,
        poster_name: oldComment.previous_comment.poster_name,
        poster_id: oldComment.previous_comment.poster_id,
        recipe_id: oldComment.previous_comment.recipe_id,
        title: oldComment.previous_comment.title,
        description: oldComment.previous_comment.description,
        previous_comment: oldComment.previous_comment.id,
        next_comments: oldComment.next_comments,
        comment_votes: oldComment.previous_comment.comment_votes,
      },
    });
  }

  updateCommentVotes(comment, num) {
    comment.comment_votes = comment.comment_votes + num;
    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/comments/${comment.id}`,
      headers: headers,
      data: {
        poster_email: comment.poster_email,
        poster_name: comment.poster_name,
        poster_id: comment.poster_id,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: comment.previous_comment,
        next_comments: comment.next_comments,
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
        poster_email: sessionStorage.email,
        poster_name: sessionStorage.name,
        recipe_id: comment.recipe_id,
        title: comment.title,
        description: comment.description,
        previous_comment: comment.previous_comment,
        next_comments: comment.next_comments,
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
