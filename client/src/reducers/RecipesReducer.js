import {
  REQUEST_ALL_RECIPES,
  REQUEST_ONE_RECIPE,
  FETCH_FAVORITED_RECIPES,
} from '../actions/index';

const initialState = {
  data: [],
  favorites: [],
};

export default function recipes(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_RECIPES:
      return {
        ...state,
        data: action.payload.body.data,
      };
    case REQUEST_ONE_RECIPE:
      return {
        ...state,
        data: action.payload.body.data,
      };
    case FETCH_FAVORITED_RECIPES:
      let arr = [];
      for (let i in action.payload) {
        if (action.payload.hasOwnProperty(i)) {
          arr.push(action.payload[i]);
        }
      }

      return {
        ...state,
        favorites: arr,
      };
    default:
      return state;
  }
}
