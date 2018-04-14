import axios from 'axios';

class RecipeServices {
  getAllRecipes() {
    return axios.get('/api/recipes');
  }

  getOneRecipe(recipe) {
    return axios.get(`/api/recipes/${recipe.id}`);
  }

  createRecipe(recipe) {
    console.log(recipe);
    return axios({
      method: 'POST',
      url: '/api/recipes',
      data: {
        user_id: 2,
        name: recipe.name,
        ingredient_list: recipe.ingredient_list,
        instruction_list: recipe.instruction_list,
        votes: 0,
      },
    });
  }

  updateRecipe(recipe) {
    return axios({
      method: 'PUT',
      url: `/api/recipes/${recipe.id}`,
      data: {
        name: recipe.name,
        ingredient_list: recipe.ingredient_list,
        instruction_list: recipe.instruction_list,
        user_id: recipe.user_id,
        votes: recipe.votes,
      },
    });
  }

  deleteRecipe(recipe) {
    return axios({
      method: 'DELETE',
      url: `/api/recipes/${recipe.id}`,
    });
  }
}

export default new RecipeServices();
