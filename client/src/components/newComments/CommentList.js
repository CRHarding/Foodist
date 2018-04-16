// import React from 'react';
// import { connect } from 'react-redux';
//
// class CommentList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       comments: Array.from(this.props.comments),
//       user: this.props.user,
//       previous_id: this.props.previousCommentId,
//     };
//     console.log(this.props);
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.comments !== this.props.comments) {
//       this.setState({ comments: Array.from(nextProps.comments) });
//     }
//   }
//
//   handleClick(comment) {
//     console.log(comment);
//     this.props.commentSubmit(comment);
//   }
//
//   renderUser(comment, id) {
//     return (
//       <div className="card blue-grey lighten-1">
//         <div className="card-content white-text">
//           <li key={id}>
//             <h3>{comment.poster_name}</h3>
//             <h4>{comment.title}</h4>
//             <p>{comment.description}</p>
//           </li>
//           <div className="card-action">
//             <button
//               className="waves-effect waves-light btn"
//               onClick={() => this.handleClick(comment)}
//             >
//               Comment
//           </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   renderNonUser(comment, id) {
//     return (
//       <div className="card blue-grey darken-3">
//         <div className="card-content white-text">
//           <li key={id}>
//             <h3>{comment.poster_name}</h3>
//             <h4>{comment.title}</h4>
//             <p>{comment.description}</p>
//           </li>
//           <div className="card-action">
//             <button
//               className="waves-effect waves-light btn"
//               onClick={() => this.handleClick(comment)}
//             >
//               Comment
//           </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//
//   render() {
//     return (
//       <div className="row">
//         <ul>
//           {this.state.comments.map((comment, id) =>
//             <div className="col s6 m6">
//               {comment.poster_id === parseInt(sessionStorage.user_id) ? this.renderUser(comment, id) : this.renderNonUser(comment, id)}
//             </div>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state, ownProps) {
//   console.log(ownProps);
//   return {
//     comments: ownProps.comments,
//   };
// }
//
// export default connect(mapStateToProps)(CommentList);

import React from 'react';
import { connect } from 'react-redux';

let arr = [];

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: Array.from(this.props.comments),
      user: this.props.user,
      previous_id: this.props.previousCommentId,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getNestedComments = this.getNestedComments.bind(this);
    this.renderNestedComments = this.renderNestedComments.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== this.props.comments) {
      this.setState({ comments: Array.from(nextProps.comments) });
    }
  }

  getCommentById(id) {
    let comment = this.state.comments.find(comment => comment.id === id);
    return Object.assign({}, comment);
  }

  getNestedComments(comments, arr) {
    if (Array.isArray(comments)) {
      comments.map(comment => {
        if (comment.next_comment !== 0) {
          return this.getNestedComments(this.getCommentById(comment), arr);
        } else {
          arr.push(comment);
        }
      });
    }
    return arr.push(comments);
  }

  handleClick(e, comment) {
    // e.stopPropagation();
    this.props.commentSubmit(comment);
  }

  renderNestedComments(comment, index) {
    if (comment.next_comment) {
      return this.renderNestedComments(this.getCommentById(comment.next_comment), index + 1);
    }

    if (comment.poster_id === parseInt(sessionStorage.user_id)) {
      this.renderUser(comment, comment.id, index);
    } else {
      this.renderNonUser(comment, comment.id, index);
    }
  }

  renderUser(comment, id, index) {
    console.log(index);
    return (
      <div className="col s9 offset-s{${index}}">
        <div className="card blue-grey lighten-1">
          <div className="card-content white-text">
            <li key={id}>
              <h3>{comment.poster_name}</h3>
              <h4>{comment.title}</h4>
              <p>{comment.description}</p>
            </li>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                onClick={() => this.handleClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNonUser(comment, id, index) {
    console.log(index);
    return (
      <div className="col s9 offset-s{${index}}">
        <div className="card blue-grey darken-3">
          <div className="card-content white-text">
            <li key={id}>
              <h3>{comment.poster_name}</h3>
              <h4>{comment.title}</h4>
              <p>{comment.description}</p>
            </li>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn"
                onClick={() => this.handleClick(comment)}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <ul>
          {this.state.comments.map((comment, id) => (
            <div>
              {comment.poster_id === parseInt(sessionStorage.user_id)
                ? this.renderUser(comment, id, 0)
                : this.renderNonUser(comment, id, 0)}
              {comment.next_comment !== 0
                ? this.renderNestedComments(comment, 0)
                : ''}
            </div>
          ))}
          {arr.map((comment, id) => (
            <div className="col s10">
              {comment.poster_id === parseInt(sessionStorage.user_id)
                ? this.renderUser(comment, id)
                : this.renderNonUser(comment, id)}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comments: ownProps.comments,
  };
}

export default connect(mapStateToProps)(CommentList);
