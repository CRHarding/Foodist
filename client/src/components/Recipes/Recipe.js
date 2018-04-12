import React from 'react';

const Recipe = ({ onClick, completed, text }) => (
  <li
    className="recipe"
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

export default Recipe;
