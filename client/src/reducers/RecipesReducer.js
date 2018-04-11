import { REQUEST_ALL_RECIPES, REQUEST_ONE_RECIPE } from '../actions/index';

const initialState = {
  data: [],
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
    default:
      return state;
  }
}
