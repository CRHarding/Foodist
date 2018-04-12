import { v4 } from 'node-uuid';
import axios from 'axios';

export const fetchRecipes = filter => {
  axios.get('/api/recipes').then(recipes => {
    switch (filter) {
      case 'all':
        return recipes;
      case 'favorite':
        return recipes.filter(t => t.favorite);
      case 'nonfavorite':
        return recipes.filter(t => t.nonfavorite);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
};

export const toggleRecipe = id => {
  axios.get('/api/recipes').then(recipes => {
    const recipe = recipes.find(t => t.id === id);
    recipe.favorite = !recipe.favorite;
    return recipe;
  });
};
