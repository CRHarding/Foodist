import axios from 'axios';

class RecipeServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getAllRecipes() {
    const headers = this.requestHeaders();
    return axios({
      methond: 'GET',
      url: '/api/recipes',
      headers: headers,
    })
      .then(recipes => {
        return recipes;
      })
      .catch(err => {
        return err;
      });
  }

  createRecipe(recipe) {
    const headers = this.requestHeaders();
    return axios({
      method: 'POST',
      url: '/api/recipes',
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        user_email: sessionStorage.email,
        user_name: sessionStorage.name,
        name: recipe.name,
        ingredient_list: recipe.ingredient_list,
        instruction_list: recipe.instruction_list,
        votes: 0,
      },
    });
  }

  updateRecipe(recipe, num) {
    const headers = this.requestHeaders();
    const newVotes = recipe.votes + num;
    return axios({
      method: 'PUT',
      url: `/api/recipes/${recipe.id}`,
      headers: headers,
      data: {
        user_id: recipe.user_id,
        user_email: recipe.email,
        user_name: recipe.user_name,
        name: recipe.name,
        ingredient_list: recipe.ingredient_list,
        instruction_list: recipe.instruction_list,
        votes: newVotes,
      },
    });
  }

  deleteRecipe(recipe) {
    const headers = this.requestHeaders();
    return axios({
      method: 'DELETE',
      url: `/api/recipes/${recipe.id}`,
      headers: headers,
    });
  }
}

export default new RecipeServices();
