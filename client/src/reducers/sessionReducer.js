import * as types from '../actions/actionTypes';
import initialState from './initialState';
import history from '../components/history';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      history.push('/recipes');
      return !!sessionStorage.jwt;
    case types.SIGNUP_SUCCESS:
      history.push('/recipes');
      return !!sessionStorage.jwt;
    case types.LOG_OUT:
      history.push('/home');
      return !!sessionStorage.jwt;
    default:
      return state;
  }
}
