import React from 'react';
import TextInput from './common/TextInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../actions/sessionActions';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: 'casey@casey.com',
        password: 'aqswdefr',
        password_confirmation: 'aqswdefr',
        fname: 'casey',
        lname: 'harding',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.signupUser(this.state.credentials);
  }

  render() {
    return (
      <div>
        <form>
          <TextInput
            name="email"
            label="email"
            value={this.state.credentials.email}
            onChange={this.onChange}
          />
          <TextInput
            name="fname"
            label="First Name"
            value={this.state.credentials.fname}
            onChange={this.onChange}
          />
          <TextInput
            name="lname"
            label="Last Name"
            value={this.state.credentials.lname}
            onChange={this.onChange}
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />
          <TextInput
            name="password_confirmation"
            label="password confirmation"
            type="password"
            value={this.state.credentials.password_confirmation}
            onChange={this.onChange}
          />
          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.onSave}
          />{' '}
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}
export default connect(null, mapDispatchToProps)(SignupPage);
