const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.recipes,
    }
  }
  return state;
}

export default byId;

export const getRecipe = (state, id) => state[id];
