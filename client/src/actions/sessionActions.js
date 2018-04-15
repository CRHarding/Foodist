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
        const jwt = response.data.jwt;
        console.log(jwt);
        const user = response.data.user;
        const name = user.fname + ' ' + user.lname;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('email', user.email)
        sessionStorage.setItem('name', name)
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
        console.log(response.data);
        const id = response.data.id;
        const email = response.data.email;
        const name = response.data.fname + response.data.lname;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user_id', id);
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('name', name)
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
