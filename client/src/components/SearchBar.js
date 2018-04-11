import React from 'react';

class SearchBar extends React.Component {
  onInputChange(term) {
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <input
          placeholder="Search for a recipe!"
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;
