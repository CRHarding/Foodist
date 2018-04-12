import { REQUEST_ALL_COMMENTS, REQUEST_ONE_COMMENT } from '../actions/index';

const initialState = {
  data: [],
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_COMMENTS:
      return {
        ...state,
        data: action.payload.body.data,
      };
    case REQUEST_ONE_COMMENT:
      return {
        ...state,
        data: action.payload.body.data,
      };
    default:
      return state;
  }
}
