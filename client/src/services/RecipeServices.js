import axios from 'axios';

class RecipeServices {
  getAllRecipes() {
    return axios.get('/api/recipes');
  }

  getOneRecipe(id) {
    return axios.get(`/api/recipes/${id}`);
  }

  createRecipe(recipe) {
    return axios({
      method: 'POST',
      url: '/api/recipes',
      data: {
        user_id: recipe.poster_id,
        name: recipe.recipe_id,
        ingredient_list: recipe.title,
        instruction_list: recipe.description,
        votes: recipe.votes,
      },
    });
  }

  editRecipe(recipe, id) {
    return axios({
      method: 'PUT',
      url: `/api/recipes/${id}`,
      data: {
        name: recipe.name,
        ingredient_list: recipe.ingredient_list,
        instruction_list: recipe.instruction_list,
        user_id: recipe.user_id,
        votes: recipe.votes,
      },
    });
  }

  deleteRecipe(id) {
    return axios({
      method: 'DELETE',
      url: `/api/recipes/${id}`,
    });
  }
}

export default new RecipeServices();
