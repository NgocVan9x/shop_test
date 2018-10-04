import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';


export const history = createHistory();

const initialState = {};
const logger = createLogger();
const enhancers = [];
const middleware = [
  logger,
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-underscore-dangle */
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  /* eslint-enable */
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

