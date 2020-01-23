import UserService from '../services/UserService';
// import { loading, doneLoading } from './SystemActions';
// import history from './../history';

export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await UserService.login(userCreds);
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in login', err);
    }
  };
}

export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await UserService.signup(userCreds);
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in signup', err);
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      await UserService.logout();
      dispatch(_setUser(null));
    } catch (err) {
      console.log('UserActions: err in logout', err);
    }
  };
}

export function getLoggedInUser() {
  return async dispatch => {
    try {
      const user = await UserService.getLoggedInUser();
      // localStorage.setItem('user', JSON.stringify(user));
      dispatch(_setUser(user));
    }  catch (err) {
      console.log('UserActions: err in logout', err);
    }
  };
}

export function _setUser(user) {
  return {
    type: 'SET_USER',
    user
  };
}