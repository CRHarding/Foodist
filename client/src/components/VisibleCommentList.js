import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleComments, getCommentErrorMessage, getIsCommentFetching } from '../reducers';
import CommentList from './CommentList';
import FetchError from './FetchError';

class VisibleCommentList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchComments } = this.props;
    fetchComments(filter);
  }

  render() {
    const { isFetching, errorMessage, toggleComment, comments } = this.props;
    if (isFetching && !comments.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !comments.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
    }
    return <CommentList comments={comments} onCommentClick={toggleComment} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params || 'all';
  return {
    isFetching: getIsCommentFetching(state, filter),
    errorMessage: getCommentErrorMessage(state, filter),
    comments: getVisibleComments(state, filter),
    filter,
  };
};

VisibleCommentList = connect(mapStateToProps, actions)(VisibleCommentList);

export default VisibleCommentList;
