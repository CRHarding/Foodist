import React from 'react';
import LoginPage from './LoginPage';
import SignUp from './Signup';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      login: false,
    };

    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  renderSignUp() {
    console.log('here again');
    return <SignUp />;
  }

  renderLogin() {
    return <LoginPage />;
  }

  signUp() {
    console.log('here');
    this.setState({ signup: !this.state.signup });
    this.setState({ login: false });
  }

  login() {
    this.setState({ login: !this.state.login });
    this.setState({ signup: false });
  }

  render() {
    return (
      <div>
        <button className="btn waves-effect waves-light" onClick={this.signUp}>
          Signup
          <i className="material-icons right">send</i>
        </button>
        <button className="btn waves-effect waves-light" onClick={this.login}>
          Login
          <i className="material-icons right">send</i>
        </button>
        {this.state.login ? this.renderLogin() : ''}
        {this.state.signup ? this.renderSignUp() : ''}
      </div>
    );
  }
}

export default Home;
