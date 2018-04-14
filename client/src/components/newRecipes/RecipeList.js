import React from 'react';
import RecipePage from './RecipePage';
import {Link} from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  return (
    <ul className="list-group">
      {recipes.map(recipe => (
        <li className="list-group-item" key={recipe.id}>
          <Link to={'/recipes/' + recipe.id}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
