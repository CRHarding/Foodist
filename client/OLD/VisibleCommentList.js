import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleComments, getCommentErrorMessage, getIsCommentFetching } from '../reducers';
import CommentList from './CommentList';
import FetchError from './FetchError';

class VisibleCommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandToggle: false,
    };
    this.expandEdit = this.expandEdit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { filter, fetchComments } = this.props;
    fetchComments(filter);
  }

  expandEdit() {
    this.setState({
      expandToggle: !this.state.expandToggle,
    });
  }

  render() {
    const { isFetching, errorMessage, comments } = this.props;
    if (isFetching && !comments.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !comments.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
    }

    return (
      <div>
        <CommentList comments={comments} onEditClick={this.expandEdit} toggle={this.state.expandToggle}/>
      </div>
    );
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
