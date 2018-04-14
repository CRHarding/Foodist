import React from 'react';
import TextInput from '../common/TextInput';

class CommentForm extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <TextInput
            type="text"
            name="title"
            label="Title"
            onChange={this.props.onChange}
            value={this.props.comment.title}
          />
          <TextInput
            type="text"
            name="description"
            label="Description"
            onChange={this.props.onChange}
            value={this.props.comment.description}
          />
          <input
            type="submit"
            disabled={this.props.saving}
            value="Comment"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
}

export default CommentForm;
