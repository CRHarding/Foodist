import * as types from './actionTypes';
import sessionApi from '../services/SessionApi';
import auth from '../auth/authenticator';
import { loadRecipes } from './recipeActions';
import { loadComments } from './commentActions';
import { loadVotes } from './voteActions';

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
        const jwt = response.data.jwt;
        const user = response.data.user;
        const name = user.fname + ' ' + user.lname;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('name', name);
        dispatch(loadComments());
        dispatch(loadRecipes());
        dispatch(loadVotes());
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
        const jwt = response.data.jwt;
        const id = response.data.user.id;
        const email = response.data.user.email;
        const name = response.data.user.fname + response.data.user.lname;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user_id', id);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        dispatch(loadComments());
        dispatch(loadRecipes());
        dispatch(loadVotes());
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
