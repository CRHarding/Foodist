import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Recipe Book</h1>
        <p>the best way manage your recipe collection.</p>
        <Link to="login" className="btn btn-primary btn-lg">Log in</Link>
      </div>
    );
  }
}

export default HomePage;
