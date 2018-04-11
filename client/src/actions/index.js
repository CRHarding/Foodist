import RecipeServices from '../services/RecipeServices';
import CommentServices from '../services/CommentServices';

export const REQUEST_ONE_RECIPE = 'REQUEST_ONE_RECIPE';
export const REQUEST_ALL_RECIPES = 'REQUEST_ALL_RECIPES';
export const REQUEST_ONE_COMMENT = 'REQUEST_ONE_COMMENT';
export const REQUEST_ALL_COMMENTS = 'REQUEST_ALL_COMMENTS';

export function requestRecipe(term = null) {
  RecipeServices.getOneRecipe()
    .then(recipe => {
      return {
        type: REQUEST_ONE_RECIPE,
        payload: recipe,
      };
    })
    .catch(err => {
      console.log('ERROR IN getOneRecipe action --->', err);
    });
  RecipeServices.getAllRecipes()
    .then(recipes => {
      return {
        type: REQUEST_ALL_RECIPES,
        payload: recipes,
      };
    })
    .catch(err => {
      console.log('ERROR IN getAllRecipes action --->', err);
    });
  CommentServices.getOneComment()
    .then(comment => {
      return {
        type: REQUEST_ONE_COMMENT,
        payload: comment,
      };
    })
    .catch(err => {
      console.log('ERROR IN getOneComment action --->', err);
    });
  CommentServices.getAllComments()
    .then(comments => {
      return {
        type: REQUEST_ALL_COMMENTS,
        payload: comments,
      };
    })
    .catch(err => {
      console.log('ERROR IN getAllComments action --->', err);
    });
}
