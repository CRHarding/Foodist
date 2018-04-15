import React from 'react';
import RecipePage from './RecipePage';
import {Link} from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  return (
    <ul className="list-group">
      {recipes.map(recipe => (
        <li className="list-group-item" key={recipe.id}>
          <Link to={'/recipes/' + recipe.id}><button className="waves-effect waves-teal btn-flat"><i class="material-icons left">cloud</i>{recipe.name} </button></Link>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
