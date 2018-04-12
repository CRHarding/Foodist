import RecipeServices from '../services/RecipeServices';
import CommentServices from '../services/CommentServices';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';

export const REQUEST_ONE_RECIPE = 'REQUEST_ONE_RECIPE';
export const REQUEST_ALL_RECIPES = 'REQUEST_ALL_RECIPES';
export const REQUEST_ONE_COMMENT = 'REQUEST_ONE_COMMENT';
export const REQUEST_ALL_COMMENTS = 'REQUEST_ALL_COMMENTS';
export const FETCH_FAVORITED_RECIPES = 'FETCH_FAVORITED_RECIPES';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

const config = {
  apiKey: 'AIzaSyBoYNmP5BZBLotYb4Sc7ZuRcBq3FAy8624',
  authDomain: 'foodist-91275.firebaseapp.com',
  databaseURL: 'https://foodist-91275.firebaseio.com',
};

Firebase.initializeApp(config);

export function favoriteRecipe({ selectedRecipe }) {
  const userUid = Firebase.auth().currentUser.uid;
  const recipeId = selectedRecipe.id;

  return dispatch =>
    Firebase.database()
      .ref(userUid)
      .update({
        [recipeId]: selectedRecipe,
      });
}

export function unfavoriteRecipe({ selectedRecipe }) {
  const userUid = Firebase.auth().currentUser.uid;
  const recipeId = selectedRecipe.id;

  return dispatch =>
    Firebase.database()
      .ref(userUid)
      .child(recipeId)
      .remove();
}

export function fetchFavoritedRecipes() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    Firebase.database()
      .ref(userUid)
      .on('value', snapshot => {
        dispatch({
          type: FETCH_FAVORITED_RECIPES,
          payload: snapshot.val(),
        });
      });
  };
}

export function requestRecipe(term = null) {
  console.log('help');
  return function(dispatch) {
    RecipeServices.getOneRecipe(term).then(recipe => {
      dispatch({
        type: REQUEST_ONE_RECIPE,
        payload: recipe,
      });
    });
  };
}

export function requestAllRecipes() {
  console.log('help');
  return function(dispatch) {
    RecipeServices.getAllRecipes().then(recipes => {
      dispatch({
        type: REQUEST_ALL_RECIPES,
        payload: recipes,
      });
    });
  };
}

export function requestComment(term = null) {
  return function(dispatch) {
    CommentServices.getOneComment(term).then(comment => {
      dispatch({
        type: REQUEST_ONE_COMMENT,
        payload: comment,
      });
    });
  };
}

export function requestAllComments(dispatch) {
  CommentServices.getAllComments().then(comments => {
    dispatch({
      type: REQUEST_ALL_COMMENTS,
      payload: comments,
    });
  });
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(err => {
        console.log('ERROR IN SIGNUPUSER --->', err);
        dispatch(authError(err));
      });
  };
}
export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(err => {
        dispatch(authError(err));
      });
  };
}

export function signOutUser() {
  return function(dispatch) {
    Firebase.auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER,
        });
      });
  };
}

export function verifyAuth() {
  return function(dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function authUser() {
  return {
    type: AUTH_USER,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const toggleRecipe = (id) => {
  return {
    type: 'TOGGLE_RECIPE',
    id,
  };
};
