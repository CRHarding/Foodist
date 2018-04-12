import React from 'react';
import Recipe from './Recipe';

const RecipeList = ({ recipes, onRecipeClick }) => (
  <ul>
    {recipes.map((recipe, idx) => (
      <Recipe
        key={idx}
        {...recipe}
        onClick={() => onRecipeClick(idx)}
      />
    ))}
  </ul>
);

export default RecipeList;
