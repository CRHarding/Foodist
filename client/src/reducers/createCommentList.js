import { combineReducers } from 'redux';

const createCommentList = filter => {
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { favorite } = entities.comments[toggleId];
    const shouldRemove = !favorite && filter === 'favorite';
    return shouldRemove ? state.filter(id => id !== toggleId) : state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_COMMENTS_SUCCESS':
        return action.comments.data.data
      case 'TOGGLE_RECIPE_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetchingComments = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_COMMENTS_REQUEST':
        return true;
      case 'FETCH_COMMENTS_SUCCESS':
      case 'FETCH_COMMENTS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const commentErrorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_COMMENTS_FAILURE':
        return action.message;
      case 'FETCH_COMMENTS_REQUEST':
      case 'FETCH_COMMENTS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetchingComments,
    commentErrorMessage,
  });
};

export default createCommentList;

export const getIds = (state) => state.ids;
export const getIsCommentFetching = (state) => state.isFetchingComments;
export const getCommentErrorMessage = (state) => state.commentErrorMessage;
