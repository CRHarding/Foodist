import axios from 'axios';

class RecipeServices {
  getAllSongs() {
    return axios.get('/api/recipies');
  }

  getOneSong() {
    return axios.get(`/api/recipies${id}`);
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
        name: recipe.recipe_id,
        ingredient_list: recipe.title,
        instruction_list: recipe.description,
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
