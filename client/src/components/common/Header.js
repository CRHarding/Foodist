import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

class Header extends React.Component {
  constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    console.log(this.props.actions);
    this.props.actions.logOutUser();
  }

  renderAuthLinks() {
    if (this.props.logged_in) {
      return [
        <li key={1}>
          <Link to="/favorites">My Favorites</Link>
        </li>,
        <li key={2}>
          <a href="/logout" onClick={this.logOut}>
            Sign Out
          </a>
        </li>,
      ];
    } else {
      return [
        <li key={1}>
          <Link to="/login">Login</Link>
        </li>,
        <li key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div className="navbar-fixed">
        <div className="nav-wrapper">
          <nav>
            <Link to="/" className="brand-logo">
              Foodist
            </Link>
            <ul className="right">{this.renderAuthLinks()}</ul>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { logged_in: state.session };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
