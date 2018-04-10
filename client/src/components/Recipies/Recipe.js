import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = props => {
  console.log('PROPS IN Recipe.JS--->', props);
  return (
    <li className="recipe">
      <p>
        <Link to={`/recipies/${props.id}`}>{props.name}</Link>
      </p>
    </li>
  );
};

export default Recipe;
