import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../actions';

class Header extends React.Component {
  handleSignout() {
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to="/favorites">
            My Favorites
          </Link>
        </li>,
        <li key={2}>
          <a onClick={() => this.handleSignout()}>
            Sign Out
          </a>
        </li>,
      ];
    } else {
      return [
        <li key={1}>
          <Link to="/login">
            Login
          </Link>
        </li>,
        <li key={2}>
          <Link to="/signup">
            Sign Up
          </Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div className ="navbar-fixed">
        <div className="nav-wrapper">
          <nav>
            <Link to ="/" className="brand-logo">
              Foodist
            </Link>
            <ul className="right">
              {this.renderAuthLinks()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
