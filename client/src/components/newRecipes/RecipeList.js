import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <ul className="list-group">
      {recipes.map(recipe => (
        <li className="list-group-item" key={recipe.id}>
          {recipe.name}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
