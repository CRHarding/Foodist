import * as types from './actionTypes';
import sessionApi from '../services/SessionApi';
import auth from '../auth/authenticator';

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS };
}

export function signupSuccess() {
  return { type: types.SIGNUP_SUCCESS };
}

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi
      .login(credentials)
      .then(response => {
        sessionStorage.setItem('jwt', response.data.jwt);
        dispatch(loginSuccess());
      })
      .catch(error => {
        throw error;
      });
  };
}

export function signupUser(credentials) {
  return function(dispatch) {
    return sessionApi
      .signup(credentials)
      .then(response => {
        console.log(response);
        sessionStorage.setItem('jwt', response.jwt);
        dispatch(signupSuccess());
      })
      .catch(error => {
        throw error;
      });
  };
}

export function logOutUser() {
  auth.logOut();
  return { type: types.LOG_OUT };
}
