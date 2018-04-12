import React from 'react';
import Recipe from './Recipe';

const RecipeList = ({ recipes, onRecipeClick }) => {
  <div>
    <ul>
      {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            {...recipe}
            onClick={() => onRecipeClick(index)}
          />
      ))}
    </ul>
  </div>;
};

export default RecipeList;
