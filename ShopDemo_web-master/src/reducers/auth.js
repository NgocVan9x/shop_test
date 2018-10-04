import { createReducer } from '../utils';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  user: null
};

export default createReducer(initialState, {
  ["LOGIN_REQUEST"]: (state) => Object.assign({}, state, {
    isAuthenticating: true,
    statusText: null,
  }),
  ["LOGIN_SUCCESS"]: (state, payload) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: true,
    user: payload.user,
    statusText: 'You have been successfully logged in.',
  }),
  ["LOGIN_FAILURE"]: (state) => Object.assign({}, state, {
    isAuthenticating: false,
    isAuthenticated: false,
    user: null,
    statusText: 'Authentication Error',
  }),
  ["LOGOUT"]: (state) => Object.assign({}, state, {
    isAuthenticated: false,
    user: null,
    statusText: 'You have been successfully logged out.',
  }),
});
