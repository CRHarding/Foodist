import axios from 'axios';

class CommentServices {
  getAllComments() {
    console.log('HERE IN GET ALL COMMENTS');
    return axios.get('/api/comments');
  }

  getOneComment(id) {
    console.log('HERE IN GET ONE COMMENT');
    return axios.get(`/api/comments/${id}`);
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
        previous_comment: comment.previous_comment,
        next_comment: comment.next_comment,
        comment_votes: comment.comment_votes,
      },
    });
  }

  editComment(comment, id) {
    console.log(comment, id);
    return axios({
      method: 'PUT',
      url: `/api/comments/${id}`,
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
    return axios({
      method: 'DELETE',
      url: `/api/comments/${id}`,
    });
  }
}

export default new CommentServices();
